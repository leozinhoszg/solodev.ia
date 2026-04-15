import type { ResultSetHeader, RowDataPacket } from "mysql2";
import { pool } from "../config/database.js";

export interface PromptSubmissionRow extends RowDataPacket {
  id: number;
  user_id: number;
  lesson_id: number | null;
  prompt_text: string;
  score: number | null;
  feedback: string | null;
  optimized_prompt: string | null;
  xp_earned: number;
  created_at: Date;
}

export async function createSubmission(
  userId: number,
  lessonId: number | null,
  promptText: string,
  score: number,
  feedback: string,
  optimizedPrompt: string,
  xpEarned: number,
): Promise<number> {
  const [result] = await pool.execute<ResultSetHeader>(
    `INSERT INTO prompt_submissions (user_id, lesson_id, prompt_text, score, feedback, optimized_prompt, xp_earned)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [userId, lessonId, promptText, score, feedback, optimizedPrompt, xpEarned],
  );
  return result.insertId;
}

export async function findSubmissionById(
  id: number,
): Promise<PromptSubmissionRow | null> {
  const [rows] = await pool.execute<PromptSubmissionRow[]>(
    "SELECT * FROM prompt_submissions WHERE id = ?",
    [id],
  );
  return rows[0] ?? null;
}

export async function findUserSubmissions(
  userId: number,
  limit = 20,
): Promise<PromptSubmissionRow[]> {
  const lim = Math.max(1, Math.min(Number(limit) | 0, 500));
  const [rows] = await pool.execute<PromptSubmissionRow[]>(
    `SELECT * FROM prompt_submissions WHERE user_id = ? ORDER BY created_at DESC LIMIT ${lim}`,
    [userId],
  );
  return rows;
}
