import { useState } from "react";
import Button from "../ui/Button";
import Card from "../ui/Card";
import { submitPrompt, type SubmitResult } from "../../services/promptLabService";

function scoreColor(score: number): string {
  if (score >= 80) return "text-emerald-400";
  if (score >= 60) return "text-yellow-400";
  if (score >= 40) return "text-orange-400";
  return "text-red-400";
}

function scoreLabel(score: number): string {
  if (score >= 90) return "Excelente";
  if (score >= 80) return "Muito bom";
  if (score >= 60) return "Bom";
  if (score >= 40) return "Regular";
  return "Precisa melhorar";
}

export default function PromptLabEditor() {
  const [promptText, setPromptText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SubmitResult | null>(null);
  const [showOptimized, setShowOptimized] = useState(false);

  async function handleSubmit() {
    if (!promptText.trim()) return;
    setLoading(true);
    setResult(null);
    setShowOptimized(false);
    try {
      const res = await submitPrompt(promptText);
      setResult(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Editor */}
      <Card>
        <label className="mb-2 block text-sm font-medium text-zinc-300">
          Escreva seu prompt
        </label>
        <textarea
          value={promptText}
          onChange={(e) => setPromptText(e.target.value)}
          placeholder="Ex: Crie uma API REST em Node.js com Express que tenha rotas de CRUD para gerenciar tarefas..."
          rows={6}
          className="w-full resize-none rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-600 outline-none transition-colors focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
        />
        <div className="mt-3 flex items-center justify-between">
          <span className="text-xs text-zinc-600">
            {promptText.length} caracteres
          </span>
          <Button onClick={handleSubmit} loading={loading} disabled={promptText.length < 10}>
            Avaliar prompt
          </Button>
        </div>
      </Card>

      {/* Result */}
      {result && (
        <>
          {/* Score + Feedback */}
          <Card variant="highlighted">
            <div className="flex items-start gap-6">
              <div className="text-center">
                <p className={`text-4xl font-bold ${scoreColor(result.score)}`}>
                  {result.score}
                </p>
                <p className={`mt-1 text-xs font-medium ${scoreColor(result.score)}`}>
                  {scoreLabel(result.score)}
                </p>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-zinc-300">Feedback</p>
                <p className="mt-1 text-sm text-zinc-400">{result.feedback}</p>
                {result.xpEarned > 0 && (
                  <p className="mt-3 text-xs font-medium text-emerald-400">
                    +{result.xpEarned} XP · +{Math.ceil(result.xpEarned / 10)} Prompt Mastery
                  </p>
                )}
              </div>
            </div>
          </Card>

          {/* Comparison toggle */}
          <div>
            <Button
              variant="secondary"
              onClick={() => setShowOptimized(!showOptimized)}
            >
              {showOptimized ? "Esconder versão otimizada" : "Ver versão otimizada"}
            </Button>
          </div>

          {showOptimized && (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Card>
                <p className="mb-2 text-xs font-semibold text-zinc-500">Seu prompt</p>
                <p className="whitespace-pre-wrap text-sm text-zinc-400">{promptText}</p>
              </Card>
              <Card variant="highlighted">
                <p className="mb-2 text-xs font-semibold text-violet-400">Versão otimizada</p>
                <p className="whitespace-pre-wrap text-sm text-zinc-300">
                  {result.optimizedPrompt}
                </p>
              </Card>
            </div>
          )}
        </>
      )}
    </div>
  );
}
