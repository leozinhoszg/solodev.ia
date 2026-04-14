import api from "./api";

export interface SubmitResult {
  id: number;
  score: number;
  feedback: string;
  optimizedPrompt: string;
  xpEarned: number;
}

export interface PromptSubmission {
  id: number;
  user_id: number;
  lesson_id: number | null;
  prompt_text: string;
  score: number | null;
  feedback: string | null;
  optimized_prompt: string | null;
  xp_earned: number;
  created_at: string;
}

export async function submitPrompt(
  promptText: string,
  lessonId?: number,
): Promise<SubmitResult> {
  const { data } = await api.post<{ success: true; data: SubmitResult }>("/prompts/submit", {
    promptText,
    lessonId,
  });
  return data.data;
}

export async function getHistory(): Promise<PromptSubmission[]> {
  const { data } = await api.get<{ success: true; data: PromptSubmission[] }>("/prompts/history");
  return data.data;
}
