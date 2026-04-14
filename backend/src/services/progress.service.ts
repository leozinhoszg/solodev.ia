import { AppError } from "../utils/AppError.js";
import { findLessonById } from "../repositories/course.repository.js";
import {
  findLessonProgress,
  markLessonCompleted,
  ensureUserAttributes,
  findUserAttributes,
  incrementAttribute,
  addXpTransaction,
  findNextLesson,
  getProgressSummary,
  findUserProgress,
} from "../repositories/progress.repository.js";

export async function completeLesson(userId: number, lessonId: number) {
  const lesson = await findLessonById(lessonId);
  if (!lesson) {
    throw new AppError(404, "Aula não encontrada", "LESSON_NOT_FOUND");
  }

  const existing = await findLessonProgress(userId, lessonId);
  if (existing?.completed) {
    return { alreadyCompleted: true, xpEarned: 0 };
  }

  await markLessonCompleted(userId, lessonId);

  // Grant XP
  const xp = lesson.xp_reward;
  await addXpTransaction(userId, xp, "lesson", lessonId, `Aula: ${lesson.title}`);

  // Increment attributes based on lesson context
  await ensureUserAttributes(userId);
  // Generic +2 to all for now — refined per-module in future sprints
  await incrementAttribute(userId, "prompt_mastery", 1);
  await incrementAttribute(userId, "frontend_power", 1);
  await incrementAttribute(userId, "backend_strength", 1);

  return { alreadyCompleted: false, xpEarned: xp };
}

export async function getDashboardData(userId: number) {
  await ensureUserAttributes(userId);
  const [attributes, nextLesson, summary, progress] = await Promise.all([
    findUserAttributes(userId),
    findNextLesson(userId),
    getProgressSummary(userId),
    findUserProgress(userId),
  ]);

  return {
    attributes,
    nextLesson,
    summary,
    completedLessonIds: progress
      .filter((p) => p.completed)
      .map((p) => p.lesson_id),
  };
}
