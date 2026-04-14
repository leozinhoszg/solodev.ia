import type { ResultSetHeader, RowDataPacket } from "mysql2";
import { pool } from "../config/database.js";

// === User Progress ===

export interface ProgressRow extends RowDataPacket {
  id: number;
  user_id: number;
  lesson_id: number;
  completed: boolean;
  completed_at: Date | null;
}

export async function findUserProgress(userId: number): Promise<ProgressRow[]> {
  const [rows] = await pool.execute<ProgressRow[]>(
    "SELECT * FROM user_progress WHERE user_id = ?",
    [userId],
  );
  return rows;
}

export async function findLessonProgress(
  userId: number,
  lessonId: number,
): Promise<ProgressRow | null> {
  const [rows] = await pool.execute<ProgressRow[]>(
    "SELECT * FROM user_progress WHERE user_id = ? AND lesson_id = ?",
    [userId, lessonId],
  );
  return rows[0] ?? null;
}

export async function markLessonCompleted(
  userId: number,
  lessonId: number,
): Promise<void> {
  await pool.execute<ResultSetHeader>(
    `INSERT INTO user_progress (user_id, lesson_id, completed, completed_at)
     VALUES (?, ?, TRUE, NOW())
     ON DUPLICATE KEY UPDATE completed = TRUE, completed_at = NOW()`,
    [userId, lessonId],
  );
}

// === User Attributes ===

export interface AttributesRow extends RowDataPacket {
  user_id: number;
  prompt_mastery: number;
  frontend_power: number;
  backend_strength: number;
  db_knowledge: number;
  security_level: number;
  deploy_speed: number;
}

export async function findUserAttributes(
  userId: number,
): Promise<AttributesRow | null> {
  const [rows] = await pool.execute<AttributesRow[]>(
    "SELECT * FROM user_attributes WHERE user_id = ?",
    [userId],
  );
  return rows[0] ?? null;
}

export async function ensureUserAttributes(userId: number): Promise<void> {
  await pool.execute(
    `INSERT IGNORE INTO user_attributes (user_id) VALUES (?)`,
    [userId],
  );
}

export async function incrementAttribute(
  userId: number,
  attribute: string,
  amount: number,
): Promise<void> {
  const allowed = [
    "prompt_mastery",
    "frontend_power",
    "backend_strength",
    "db_knowledge",
    "security_level",
    "deploy_speed",
  ];
  if (!allowed.includes(attribute)) return;

  await pool.execute(
    `UPDATE user_attributes SET ${attribute} = LEAST(${attribute} + ?, 100), updated_at = NOW() WHERE user_id = ?`,
    [amount, userId],
  );
}

// === XP Transactions ===

export async function addXpTransaction(
  userId: number,
  amount: number,
  source: string,
  sourceId: number | null,
  description: string,
): Promise<void> {
  await pool.execute(
    `INSERT INTO xp_transactions (user_id, amount, source, source_id, description) VALUES (?, ?, ?, ?, ?)`,
    [userId, amount, source, sourceId, description],
  );
  await pool.execute(
    `UPDATE users SET total_xp = total_xp + ? WHERE id = ?`,
    [amount, userId],
  );
}

// === Continue where you left off ===

export interface NextLessonRow extends RowDataPacket {
  lesson_id: number;
  lesson_title: string;
  course_id: number;
  course_title: string;
  module_title: string;
}

export async function findNextLesson(
  userId: number,
): Promise<NextLessonRow | null> {
  const [rows] = await pool.execute<NextLessonRow[]>(
    `SELECT l.id as lesson_id, l.title as lesson_title,
            c.id as course_id, c.title as course_title,
            m.title as module_title
     FROM lessons l
     JOIN modules m ON l.module_id = m.id
     JOIN courses c ON m.course_id = c.id
     LEFT JOIN user_progress up ON up.lesson_id = l.id AND up.user_id = ?
     WHERE up.completed IS NULL OR up.completed = FALSE
     ORDER BY c.order_index ASC, m.order_index ASC, l.order_index ASC
     LIMIT 1`,
    [userId],
  );
  return rows[0] ?? null;
}

// === Stats summary ===

export interface ProgressSummary extends RowDataPacket {
  total_lessons: number;
  completed_lessons: number;
}

export async function getProgressSummary(
  userId: number,
): Promise<ProgressSummary> {
  const [rows] = await pool.execute<ProgressSummary[]>(
    `SELECT
       (SELECT COUNT(*) FROM lessons) as total_lessons,
       (SELECT COUNT(*) FROM user_progress WHERE user_id = ? AND completed = TRUE) as completed_lessons`,
    [userId],
  );
  return rows[0];
}
