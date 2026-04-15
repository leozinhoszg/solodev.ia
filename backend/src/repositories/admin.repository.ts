import type { ResultSetHeader, RowDataPacket } from "mysql2";
import { pool } from "../config/database.js";

// ============ USERS ============
export async function listUsers(limit = 100, offset = 0) {
  const lim = Math.max(1, Math.min(Number(limit) | 0, 500));
  const off = Math.max(0, Number(offset) | 0);
  const [rows] = await pool.query<RowDataPacket[]>(
    `SELECT id, name, email, avatar_url, plan, role, current_rank, total_xp, created_at
     FROM users ORDER BY created_at DESC LIMIT ${lim} OFFSET ${off}`,
  );
  return rows;
}

export async function updateUserAdmin(
  id: number,
  data: { plan?: string; role?: string; current_rank?: string; total_xp?: number },
) {
  const fields: string[] = [];
  const values: any[] = [];
  for (const [k, v] of Object.entries(data)) {
    if (v !== undefined) {
      fields.push(`${k} = ?`);
      values.push(v);
    }
  }
  if (!fields.length) return;
  values.push(id);
  await pool.execute(`UPDATE users SET ${fields.join(", ")} WHERE id = ?`, values);
}

export async function deleteUser(id: number) {
  await pool.execute("DELETE FROM users WHERE id = ?", [id]);
}

// ============ COURSES ============
export async function listAllCourses() {
  const [rows] = await pool.execute<RowDataPacket[]>(
    "SELECT * FROM courses ORDER BY order_index ASC",
  );
  return rows;
}

export async function createCourse(data: {
  title: string;
  rank_required: string;
  plan_required: string;
  order_index: number;
}) {
  const [r] = await pool.execute<ResultSetHeader>(
    "INSERT INTO courses (title, rank_required, plan_required, order_index) VALUES (?,?,?,?)",
    [data.title, data.rank_required, data.plan_required, data.order_index],
  );
  return r.insertId;
}

export async function updateCourse(id: number, data: Record<string, any>) {
  const fields = Object.keys(data).map((k) => `${k} = ?`);
  if (!fields.length) return;
  await pool.execute(
    `UPDATE courses SET ${fields.join(", ")} WHERE id = ?`,
    [...Object.values(data), id],
  );
}

export async function deleteCourse(id: number) {
  await pool.execute("DELETE FROM courses WHERE id = ?", [id]);
}

// ============ MODULES ============
export async function listModulesByCourse(courseId: number) {
  const [rows] = await pool.execute<RowDataPacket[]>(
    "SELECT * FROM modules WHERE course_id = ? ORDER BY order_index ASC",
    [courseId],
  );
  return rows;
}

export async function createModule(data: {
  course_id: number;
  title: string;
  order_index: number;
}) {
  const [r] = await pool.execute<ResultSetHeader>(
    "INSERT INTO modules (course_id, title, order_index) VALUES (?,?,?)",
    [data.course_id, data.title, data.order_index],
  );
  return r.insertId;
}

export async function updateModule(id: number, data: Record<string, any>) {
  const fields = Object.keys(data).map((k) => `${k} = ?`);
  if (!fields.length) return;
  await pool.execute(
    `UPDATE modules SET ${fields.join(", ")} WHERE id = ?`,
    [...Object.values(data), id],
  );
}

export async function deleteModule(id: number) {
  await pool.execute("DELETE FROM modules WHERE id = ?", [id]);
}

// ============ LESSONS ============
export async function listLessonsByModule(moduleId: number) {
  const [rows] = await pool.execute<RowDataPacket[]>(
    "SELECT * FROM lessons WHERE module_id = ? ORDER BY order_index ASC",
    [moduleId],
  );
  return rows;
}

export async function createLesson(data: {
  module_id: number;
  title: string;
  video_provider?: string;
  video_id?: string | null;
  video_url?: string | null;
  duration_s?: number | null;
  xp_reward?: number;
  order_index: number;
}) {
  const [r] = await pool.execute<ResultSetHeader>(
    `INSERT INTO lessons (module_id, title, video_provider, video_id, video_url, duration_s, xp_reward, order_index)
     VALUES (?,?,?,?,?,?,?,?)`,
    [
      data.module_id,
      data.title,
      data.video_provider ?? "bunny",
      data.video_id ?? null,
      data.video_url ?? null,
      data.duration_s ?? null,
      data.xp_reward ?? 20,
      data.order_index,
    ],
  );
  return r.insertId;
}

export async function updateLesson(id: number, data: Record<string, any>) {
  const fields = Object.keys(data).map((k) => `${k} = ?`);
  if (!fields.length) return;
  await pool.execute(
    `UPDATE lessons SET ${fields.join(", ")} WHERE id = ?`,
    [...Object.values(data), id],
  );
}

export async function deleteLesson(id: number) {
  await pool.execute("DELETE FROM lessons WHERE id = ?", [id]);
}

// ============ BADGES ============
export async function listBadges() {
  const [rows] = await pool.execute<RowDataPacket[]>("SELECT * FROM badges ORDER BY id");
  return rows;
}

export async function createBadge(data: {
  slug: string;
  name: string;
  description?: string | null;
  rank_tier: string;
}) {
  const [r] = await pool.execute<ResultSetHeader>(
    "INSERT INTO badges (slug, name, description, rank_tier) VALUES (?,?,?,?)",
    [data.slug, data.name, data.description ?? null, data.rank_tier],
  );
  return r.insertId;
}

export async function updateBadge(id: number, data: Record<string, any>) {
  const fields = Object.keys(data).map((k) => `${k} = ?`);
  if (!fields.length) return;
  await pool.execute(
    `UPDATE badges SET ${fields.join(", ")} WHERE id = ?`,
    [...Object.values(data), id],
  );
}

export async function deleteBadge(id: number) {
  await pool.execute("DELETE FROM badges WHERE id = ?", [id]);
}

// ============ QUESTS ============
export async function listQuests() {
  const [rows] = await pool.execute<RowDataPacket[]>("SELECT * FROM quests ORDER BY id");
  return rows;
}

export async function createQuest(data: {
  slug: string;
  title: string;
  description?: string | null;
  type: string;
  xp_reward: number;
  badge_id?: number | null;
  reset_daily?: boolean;
}) {
  const [r] = await pool.execute<ResultSetHeader>(
    `INSERT INTO quests (slug, title, description, type, xp_reward, badge_id, reset_daily)
     VALUES (?,?,?,?,?,?,?)`,
    [
      data.slug,
      data.title,
      data.description ?? null,
      data.type,
      data.xp_reward,
      data.badge_id ?? null,
      data.reset_daily ?? false,
    ],
  );
  return r.insertId;
}

export async function updateQuest(id: number, data: Record<string, any>) {
  const fields = Object.keys(data).map((k) => `${k} = ?`);
  if (!fields.length) return;
  await pool.execute(
    `UPDATE quests SET ${fields.join(", ")} WHERE id = ?`,
    [...Object.values(data), id],
  );
}

export async function deleteQuest(id: number) {
  await pool.execute("DELETE FROM quests WHERE id = ?", [id]);
}

// ============ DUNGEONS ============
export async function listDungeons() {
  const [rows] = await pool.execute<RowDataPacket[]>(
    "SELECT * FROM dungeons ORDER BY id",
  );
  return rows;
}

export async function createDungeon(data: {
  slug: string;
  title: string;
  rank_required: string;
  description?: string | null;
  xp_reward: number;
  badge_id?: number | null;
}) {
  const [r] = await pool.execute<ResultSetHeader>(
    `INSERT INTO dungeons (slug, title, rank_required, description, xp_reward, badge_id)
     VALUES (?,?,?,?,?,?)`,
    [
      data.slug,
      data.title,
      data.rank_required,
      data.description ?? null,
      data.xp_reward,
      data.badge_id ?? null,
    ],
  );
  return r.insertId;
}

export async function updateDungeon(id: number, data: Record<string, any>) {
  const fields = Object.keys(data).map((k) => `${k} = ?`);
  if (!fields.length) return;
  await pool.execute(
    `UPDATE dungeons SET ${fields.join(", ")} WHERE id = ?`,
    [...Object.values(data), id],
  );
}

export async function deleteDungeon(id: number) {
  await pool.execute("DELETE FROM dungeons WHERE id = ?", [id]);
}

// ============ DUNGEON CHECKPOINTS ============
export async function listCheckpointsByDungeon(dungeonId: number) {
  const [rows] = await pool.execute<RowDataPacket[]>(
    "SELECT * FROM dungeon_checkpoints WHERE dungeon_id = ? ORDER BY order_index ASC",
    [dungeonId],
  );
  return rows;
}

export async function createCheckpoint(data: {
  dungeon_id: number;
  description: string;
  order_index: number;
}) {
  const [r] = await pool.execute<ResultSetHeader>(
    "INSERT INTO dungeon_checkpoints (dungeon_id, description, order_index) VALUES (?,?,?)",
    [data.dungeon_id, data.description, data.order_index],
  );
  return r.insertId;
}

export async function updateCheckpoint(id: number, data: Record<string, any>) {
  const fields = Object.keys(data).map((k) => `${k} = ?`);
  if (!fields.length) return;
  await pool.execute(
    `UPDATE dungeon_checkpoints SET ${fields.join(", ")} WHERE id = ?`,
    [...Object.values(data), id],
  );
}

export async function deleteCheckpoint(id: number) {
  await pool.execute("DELETE FROM dungeon_checkpoints WHERE id = ?", [id]);
}

// ============ STATS ============
export async function getStats() {
  const [[counts]] = await pool.execute<RowDataPacket[]>(
    `SELECT
       (SELECT COUNT(*) FROM users) AS users,
       (SELECT COUNT(*) FROM users WHERE plan = 'pro') AS pro_users,
       (SELECT COUNT(*) FROM courses) AS courses,
       (SELECT COUNT(*) FROM lessons) AS lessons,
       (SELECT COUNT(*) FROM badges) AS badges,
       (SELECT COUNT(*) FROM quests) AS quests,
       (SELECT COUNT(*) FROM dungeons) AS dungeons`,
  );
  return counts;
}
