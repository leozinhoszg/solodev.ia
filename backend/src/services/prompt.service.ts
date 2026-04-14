import Anthropic from "@anthropic-ai/sdk";
import { env } from "../config/env.js";
import { AppError } from "../utils/AppError.js";
import { createSubmission, findUserSubmissions } from "../repositories/prompt.repository.js";
import { addXpTransaction } from "../repositories/progress.repository.js";
import { incrementAttribute, ensureUserAttributes } from "../repositories/progress.repository.js";

const SYSTEM_PROMPT = `Você é um avaliador de prompts para desenvolvimento de software com IA.
O aluno escreveu um prompt para ser usado com uma ferramenta de IA (como Claude Code).
Sua tarefa é:
1. Avaliar o prompt de 0 a 100 considerando: clareza, contexto, objetivo definido, restrições e estrutura.
2. Dar um feedback construtivo em português (2-3 frases).
3. Reescrever uma versão otimizada do prompt.

Responda EXATAMENTE neste formato JSON (sem markdown, sem code blocks):
{"score": <number>, "feedback": "<string>", "optimized": "<string>"}`;

interface EvaluationResult {
  score: number;
  feedback: string;
  optimized: string;
}

async function evaluateWithClaude(promptText: string): Promise<EvaluationResult> {
  if (!env.ANTHROPIC_API_KEY) {
    // Fallback for development without API key
    return {
      score: 65,
      feedback: "Prompt funcional mas pode ser mais específico. Adicione contexto sobre o projeto e restrições técnicas para obter resultados melhores da IA.",
      optimized: `${promptText}\n\nContexto: [descreva o projeto aqui]\nRestrições: [liste tecnologias e padrões]\nFormato esperado: [descreva o output desejado]`,
    };
  }

  const client = new Anthropic({ apiKey: env.ANTHROPIC_API_KEY });

  const message = await client.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 1024,
    system: SYSTEM_PROMPT,
    messages: [
      { role: "user", content: `Avalie este prompt:\n\n${promptText}` },
    ],
  });

  const text = message.content[0].type === "text" ? message.content[0].text : "";

  try {
    const parsed = JSON.parse(text) as EvaluationResult;
    return {
      score: Math.max(0, Math.min(100, parsed.score)),
      feedback: parsed.feedback,
      optimized: parsed.optimized,
    };
  } catch {
    throw new AppError(500, "Erro ao processar resposta da IA", "AI_PARSE_ERROR");
  }
}

export async function submitPrompt(
  userId: number,
  promptText: string,
  lessonId: number | null,
) {
  if (!promptText.trim() || promptText.length < 10) {
    throw new AppError(400, "Prompt muito curto. Escreva pelo menos 10 caracteres.", "PROMPT_TOO_SHORT");
  }

  const evaluation = await evaluateWithClaude(promptText);

  // Calculate XP based on score
  const xpEarned = Math.floor(evaluation.score / 100 * 30); // max 30 XP per submission

  const submissionId = await createSubmission(
    userId,
    lessonId,
    promptText,
    evaluation.score,
    evaluation.feedback,
    evaluation.optimized,
    xpEarned,
  );

  // Grant XP
  if (xpEarned > 0) {
    await addXpTransaction(userId, xpEarned, "prompt_lab", submissionId, `Prompt Lab: score ${evaluation.score}`);
    await ensureUserAttributes(userId);
    await incrementAttribute(userId, "prompt_mastery", Math.ceil(xpEarned / 10));
  }

  return {
    id: submissionId,
    score: evaluation.score,
    feedback: evaluation.feedback,
    optimizedPrompt: evaluation.optimized,
    xpEarned,
  };
}

export async function getHistory(userId: number) {
  return findUserSubmissions(userId, 20);
}
