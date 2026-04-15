import type { Request, Response, NextFunction } from "express";
import { z } from "zod/v4";
import * as repo from "../repositories/admin.repository.js";
import { AppError } from "../utils/AppError.js";

const RANK = z.enum(["E", "D", "C", "B", "A", "S"]);
const PLAN = z.enum(["free", "pro"]);

const wrap =
  (handler: (req: Request, res: Response) => Promise<any>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await handler(req, res);
    } catch (err) {
      next(err);
    }
  };

const ok = (res: Response, data: unknown, status = 200) =>
  res.status(status).json({ success: true, data });

const parseId = (v: string | string[] | undefined) => {
  const raw = Array.isArray(v) ? v[0] : v;
  const n = Number(raw);
  if (!Number.isFinite(n) || n <= 0) throw new AppError(400, "ID inválido", "BAD_ID");
  return n;
};

// ====== STATS ======
export const stats = wrap(async (_req, res) => {
  ok(res, await repo.getStats());
});

// ====== USERS ======
const userUpdateSchema = z.object({
  plan: PLAN.optional(),
  role: z.enum(["user", "admin"]).optional(),
  current_rank: RANK.optional(),
  total_xp: z.number().int().min(0).optional(),
});

export const listUsers = wrap(async (req, res) => {
  const limit = Math.min(Number(req.query.limit) || 100, 500);
  const offset = Number(req.query.offset) || 0;
  ok(res, await repo.listUsers(limit, offset));
});
export const updateUser = wrap(async (req, res) => {
  const data = userUpdateSchema.parse(req.body);
  await repo.updateUserAdmin(parseId(req.params.id), data);
  ok(res, { updated: true });
});
export const deleteUser = wrap(async (req, res) => {
  await repo.deleteUser(parseId(req.params.id));
  ok(res, { deleted: true });
});

// ====== COURSES ======
const courseSchema = z.object({
  title: z.string().min(1).max(200),
  rank_required: RANK,
  plan_required: PLAN,
  order_index: z.number().int().min(0),
});

export const listCourses = wrap(async (_req, res) => ok(res, await repo.listAllCourses()));
export const createCourse = wrap(async (req, res) => {
  const data = courseSchema.parse(req.body);
  ok(res, { id: await repo.createCourse(data) }, 201);
});
export const updateCourse = wrap(async (req, res) => {
  const data = courseSchema.partial().parse(req.body);
  await repo.updateCourse(parseId(req.params.id), data);
  ok(res, { updated: true });
});
export const deleteCourse = wrap(async (req, res) => {
  await repo.deleteCourse(parseId(req.params.id));
  ok(res, { deleted: true });
});

// ====== MODULES ======
const moduleSchema = z.object({
  course_id: z.number().int().positive(),
  title: z.string().min(1).max(200),
  order_index: z.number().int().min(0),
});

export const listModules = wrap(async (req, res) => {
  ok(res, await repo.listModulesByCourse(parseId(req.params.courseId)));
});
export const createModule = wrap(async (req, res) => {
  const data = moduleSchema.parse(req.body);
  ok(res, { id: await repo.createModule(data) }, 201);
});
export const updateModule = wrap(async (req, res) => {
  const data = moduleSchema.partial().parse(req.body);
  await repo.updateModule(parseId(req.params.id), data);
  ok(res, { updated: true });
});
export const deleteModule = wrap(async (req, res) => {
  await repo.deleteModule(parseId(req.params.id));
  ok(res, { deleted: true });
});

// ====== LESSONS ======
const lessonSchema = z.object({
  module_id: z.number().int().positive(),
  title: z.string().min(1).max(200),
  video_provider: z.enum(["bunny"]).optional(),
  video_id: z.string().max(255).nullable().optional(),
  video_url: z.string().max(500).nullable().optional(),
  duration_s: z.number().int().min(0).nullable().optional(),
  xp_reward: z.number().int().min(0).optional(),
  order_index: z.number().int().min(0),
});

export const listLessons = wrap(async (req, res) => {
  ok(res, await repo.listLessonsByModule(parseId(req.params.moduleId)));
});
export const createLesson = wrap(async (req, res) => {
  const data = lessonSchema.parse(req.body);
  ok(res, { id: await repo.createLesson(data) }, 201);
});
export const updateLesson = wrap(async (req, res) => {
  const data = lessonSchema.partial().parse(req.body);
  await repo.updateLesson(parseId(req.params.id), data);
  ok(res, { updated: true });
});
export const deleteLesson = wrap(async (req, res) => {
  await repo.deleteLesson(parseId(req.params.id));
  ok(res, { deleted: true });
});

// ====== BADGES ======
const badgeSchema = z.object({
  slug: z.string().min(1).max(100),
  name: z.string().min(1).max(150),
  description: z.string().nullable().optional(),
  rank_tier: RANK,
});

export const listBadges = wrap(async (_req, res) => ok(res, await repo.listBadges()));
export const createBadge = wrap(async (req, res) => {
  const data = badgeSchema.parse(req.body);
  ok(res, { id: await repo.createBadge(data) }, 201);
});
export const updateBadge = wrap(async (req, res) => {
  const data = badgeSchema.partial().parse(req.body);
  await repo.updateBadge(parseId(req.params.id), data);
  ok(res, { updated: true });
});
export const deleteBadge = wrap(async (req, res) => {
  await repo.deleteBadge(parseId(req.params.id));
  ok(res, { deleted: true });
});

// ====== QUESTS ======
const questSchema = z.object({
  slug: z.string().min(1).max(100),
  title: z.string().min(1).max(200),
  description: z.string().nullable().optional(),
  type: z.enum(["main", "daily", "side"]),
  xp_reward: z.number().int().min(0),
  badge_id: z.number().int().positive().nullable().optional(),
  reset_daily: z.boolean().optional(),
});

export const listQuests = wrap(async (_req, res) => ok(res, await repo.listQuests()));
export const createQuest = wrap(async (req, res) => {
  const data = questSchema.parse(req.body);
  ok(res, { id: await repo.createQuest(data) }, 201);
});
export const updateQuest = wrap(async (req, res) => {
  const data = questSchema.partial().parse(req.body);
  await repo.updateQuest(parseId(req.params.id), data);
  ok(res, { updated: true });
});
export const deleteQuest = wrap(async (req, res) => {
  await repo.deleteQuest(parseId(req.params.id));
  ok(res, { deleted: true });
});

// ====== DUNGEONS ======
const dungeonSchema = z.object({
  slug: z.string().min(1).max(100),
  title: z.string().min(1).max(200),
  rank_required: z.enum(["C", "B", "A", "S"]),
  description: z.string().nullable().optional(),
  xp_reward: z.number().int().min(0),
  badge_id: z.number().int().positive().nullable().optional(),
});

export const listDungeons = wrap(async (_req, res) => ok(res, await repo.listDungeons()));
export const createDungeon = wrap(async (req, res) => {
  const data = dungeonSchema.parse(req.body);
  ok(res, { id: await repo.createDungeon(data) }, 201);
});
export const updateDungeon = wrap(async (req, res) => {
  const data = dungeonSchema.partial().parse(req.body);
  await repo.updateDungeon(parseId(req.params.id), data);
  ok(res, { updated: true });
});
export const deleteDungeon = wrap(async (req, res) => {
  await repo.deleteDungeon(parseId(req.params.id));
  ok(res, { deleted: true });
});

// ====== DUNGEON CHECKPOINTS ======
const checkpointSchema = z.object({
  dungeon_id: z.number().int().positive(),
  description: z.string().min(1).max(300),
  order_index: z.number().int().min(0),
});

export const listCheckpoints = wrap(async (req, res) => {
  ok(res, await repo.listCheckpointsByDungeon(parseId(req.params.dungeonId)));
});
export const createCheckpoint = wrap(async (req, res) => {
  const data = checkpointSchema.parse(req.body);
  ok(res, { id: await repo.createCheckpoint(data) }, 201);
});
export const updateCheckpoint = wrap(async (req, res) => {
  const data = checkpointSchema.partial().parse(req.body);
  await repo.updateCheckpoint(parseId(req.params.id), data);
  ok(res, { updated: true });
});
export const deleteCheckpoint = wrap(async (req, res) => {
  await repo.deleteCheckpoint(parseId(req.params.id));
  ok(res, { deleted: true });
});
