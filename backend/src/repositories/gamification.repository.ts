import type { ResultSetHeader, RowDataPacket } from "mysql2";
import { pool } from "../config/database.js";

// === Badges ===

export interface BadgeRow extends RowDataPacket {
  id: number;
  slug: string;
  name: string;
  description: string | null;
  rank_tier: string;
}

export interface UserBadgeRow extends RowDataPacket {
  id: number;
  badge_id: number;
  slug: string;
  name: string;
  description: string | null;
  rank_tier: string;
  earned_at: Date;
}

export async function findAllBadges(): Promise<BadgeRow[]> {
  const [rows] = await pool.execute<BadgeRow[]>(
    "SELECT * FROM badges ORDER BY rank_tier ASC, id ASC",
  );
  return rows;
}

export async function findUserBadges(userId: number): Promise<UserBadgeRow[]> {
  const [rows] = await pool.execute<UserBadgeRow[]>(
    `SELECT ub.id, ub.badge_id, b.slug, b.name, b.description, b.rank_tier, ub.earned_at
     FROM user_badges ub
     JOIN badges b ON ub.badge_id = b.id
     WHERE ub.user_id = ?
     ORDER BY ub.earned_at DESC`,
    [userId],
  );
  return rows;
}

export async function grantBadge(userId: number, badgeSlug: string): Promise<boolean> {
  const [badges] = await pool.execute<BadgeRow[]>(
    "SELECT id FROM badges WHERE slug = ?",
    [badgeSlug],
  );
  if (!badges[0]) return false;

  try {
    await pool.execute<ResultSetHeader>(
      "INSERT IGNORE INTO user_badges (user_id, badge_id) VALUES (?, ?)",
      [userId, badges[0].id],
    );
    return true;
  } catch {
    return false;
  }
}

export async function userHasBadge(userId: number, badgeSlug: string): Promise<boolean> {
  const [rows] = await pool.execute<RowDataPacket[]>(
    `SELECT 1 FROM user_badges ub JOIN badges b ON ub.badge_id = b.id
     WHERE ub.user_id = ? AND b.slug = ? LIMIT 1`,
    [userId, badgeSlug],
  );
  return rows.length > 0;
}

// === Quests ===

export interface QuestRow extends RowDataPacket {
  id: number;
  slug: string;
  title: string;
  description: string | null;
  type: "main" | "daily" | "side";
  xp_reward: number;
  badge_id: number | null;
  reset_daily: boolean;
}

export interface UserQuestRow extends RowDataPacket {
  quest_id: number;
  slug: string;
  title: string;
  description: string | null;
  type: string;
  xp_reward: number;
  completed: boolean;
  completed_at: Date | null;
}

export async function findQuestsWithStatus(userId: number): Promise<UserQuestRow[]> {
  const [rows] = await pool.execute<UserQuestRow[]>(
    `SELECT q.id as quest_id, q.slug, q.title, q.description, q.type, q.xp_reward,
            COALESCE(uq.completed, FALSE) as completed, uq.completed_at
     FROM quests q
     LEFT JOIN user_quests uq ON q.id = uq.quest_id AND uq.user_id = ?
     ORDER BY q.type ASC, q.id ASC`,
    [userId],
  );
  return rows;
}

export async function completeQuest(userId: number, questSlug: string): Promise<{ xpReward: number; badgeSlug: string | null } | null> {
  const [quests] = await pool.execute<(QuestRow & { badge_slug: string | null })[]>(
    `SELECT q.*, b.slug as badge_slug FROM quests q LEFT JOIN badges b ON q.badge_id = b.id WHERE q.slug = ?`,
    [questSlug],
  );
  const quest = quests[0];
  if (!quest) return null;

  await pool.execute<ResultSetHeader>(
    `INSERT INTO user_quests (user_id, quest_id, completed, completed_at)
     VALUES (?, ?, TRUE, NOW())
     ON DUPLICATE KEY UPDATE completed = TRUE, completed_at = NOW()`,
    [userId, quest.id],
  );

  return { xpReward: quest.xp_reward, badgeSlug: quest.badge_slug };
}

// === Streaks ===

export interface StreakRow extends RowDataPacket {
  user_id: number;
  current_streak: number;
  longest_streak: number;
  last_activity: string | null;
}

export async function findUserStreak(userId: number): Promise<StreakRow | null> {
  const [rows] = await pool.execute<StreakRow[]>(
    "SELECT * FROM user_streaks WHERE user_id = ?",
    [userId],
  );
  return rows[0] ?? null;
}

export async function updateStreak(userId: number): Promise<StreakRow> {
  const today = new Date().toISOString().slice(0, 10);

  // Ensure row exists
  await pool.execute(
    "INSERT IGNORE INTO user_streaks (user_id, current_streak, longest_streak, last_activity) VALUES (?, 0, 0, NULL)",
    [userId],
  );

  const streak = (await findUserStreak(userId))!;

  if (streak.last_activity === today) {
    return streak; // Already counted today
  }

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().slice(0, 10);

  let newStreak: number;
  if (streak.last_activity === yesterdayStr) {
    newStreak = streak.current_streak + 1;
  } else {
    newStreak = 1; // Reset
  }

  const newLongest = Math.max(streak.longest_streak, newStreak);

  await pool.execute(
    "UPDATE user_streaks SET current_streak = ?, longest_streak = ?, last_activity = ? WHERE user_id = ?",
    [newStreak, newLongest, today, userId],
  );

  return { ...streak, current_streak: newStreak, longest_streak: newLongest, last_activity: today };
}

// === Rank Calculation ===

export async function recalculateRank(userId: number): Promise<string> {
  const [rows] = await pool.execute<RowDataPacket[]>(
    "SELECT prompt_mastery, frontend_power, backend_strength, db_knowledge, security_level, deploy_speed FROM user_attributes WHERE user_id = ?",
    [userId],
  );
  if (!rows[0]) return "E";

  const attrs = rows[0];
  const minAttr = Math.min(
    attrs.prompt_mastery as number,
    attrs.frontend_power as number,
    attrs.backend_strength as number,
    attrs.db_knowledge as number,
    attrs.security_level as number,
    attrs.deploy_speed as number,
  );

  let rank: string;
  if (minAttr >= 90) rank = "S";
  else if (minAttr >= 70) rank = "A";
  else if (minAttr >= 50) rank = "B";
  else if (minAttr >= 30) rank = "C";
  else if (minAttr >= 15) rank = "D";
  else rank = "E";

  await pool.execute("UPDATE users SET current_rank = ? WHERE id = ?", [rank, userId]);
  return rank;
}
