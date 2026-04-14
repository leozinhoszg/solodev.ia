import type { RowDataPacket } from "mysql2";
import { pool } from "../config/database.js";

export interface CourseRow extends RowDataPacket {
  id: number;
  title: string;
  rank_required: string;
  plan_required: "free" | "pro";
  order_index: number;
}

export interface ModuleRow extends RowDataPacket {
  id: number;
  course_id: number;
  title: string;
  order_index: number;
}

export interface LessonRow extends RowDataPacket {
  id: number;
  module_id: number;
  title: string;
  video_provider: string;
  video_id: string | null;
  video_url: string | null;
  duration_s: number | null;
  xp_reward: number;
  order_index: number;
}

export async function findAllCourses(): Promise<CourseRow[]> {
  const [rows] = await pool.execute<CourseRow[]>(
    "SELECT * FROM courses ORDER BY order_index ASC",
  );
  return rows;
}

export async function findCourseById(id: number): Promise<CourseRow | null> {
  const [rows] = await pool.execute<CourseRow[]>(
    "SELECT * FROM courses WHERE id = ?",
    [id],
  );
  return rows[0] ?? null;
}

export async function findModulesByCourseId(courseId: number): Promise<ModuleRow[]> {
  const [rows] = await pool.execute<ModuleRow[]>(
    "SELECT * FROM modules WHERE course_id = ? ORDER BY order_index ASC",
    [courseId],
  );
  return rows;
}

export async function findLessonsByModuleId(moduleId: number): Promise<LessonRow[]> {
  const [rows] = await pool.execute<LessonRow[]>(
    "SELECT * FROM lessons WHERE module_id = ? ORDER BY order_index ASC",
    [moduleId],
  );
  return rows;
}

export async function findLessonById(id: number): Promise<LessonRow | null> {
  const [rows] = await pool.execute<LessonRow[]>(
    "SELECT * FROM lessons WHERE id = ?",
    [id],
  );
  return rows[0] ?? null;
}

export interface LessonWithPlanRow extends LessonRow {
  plan_required: "free" | "pro";
  course_id: number;
}

export async function findLessonWithPlan(id: number): Promise<LessonWithPlanRow | null> {
  const [rows] = await pool.execute<LessonWithPlanRow[]>(
    `SELECT l.*, c.plan_required, c.id as course_id
     FROM lessons l
     JOIN modules m ON l.module_id = m.id
     JOIN courses c ON m.course_id = c.id
     WHERE l.id = ?`,
    [id],
  );
  return rows[0] ?? null;
}

export async function findCourseWithModulesAndLessons(courseId: number) {
  const course = await findCourseById(courseId);
  if (!course) return null;

  const modules = await findModulesByCourseId(courseId);
  const modulesWithLessons = await Promise.all(
    modules.map(async (mod) => {
      const lessons = await findLessonsByModuleId(mod.id);
      return { ...mod, lessons };
    }),
  );

  return { ...course, modules: modulesWithLessons };
}
