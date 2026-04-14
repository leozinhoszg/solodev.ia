import type { ResultSetHeader, RowDataPacket } from "mysql2";
import { pool } from "../config/database.js";

// === Dungeons ===

export interface DungeonRow extends RowDataPacket {
  id: number;
  slug: string;
  title: string;
  rank_required: string;
  description: string | null;
  xp_reward: number;
  badge_id: number | null;
}

export interface CheckpointRow extends RowDataPacket {
  id: number;
  dungeon_id: number;
  description: string;
  order_index: number;
}

export interface UserDungeonRow extends RowDataPacket {
  dungeon_id: number;
  status: "not_started" | "in_progress" | "completed";
  started_at: Date | null;
  completed_at: Date | null;
}

export interface UserCheckpointRow extends RowDataPacket {
  checkpoint_id: number;
  checked: boolean;
  checked_at: Date | null;
}

export async function findAllDungeons(): Promise<DungeonRow[]> {
  const [rows] = await pool.execute<DungeonRow[]>(
    "SELECT * FROM dungeons ORDER BY FIELD(rank_required, 'C','B','A','S'), id ASC",
  );
  return rows;
}

export async function findDungeonBySlug(slug: string): Promise<DungeonRow | null> {
  const [rows] = await pool.execute<DungeonRow[]>(
    "SELECT * FROM dungeons WHERE slug = ?",
    [slug],
  );
  return rows[0] ?? null;
}

export async function findDungeonCheckpoints(dungeonId: number): Promise<CheckpointRow[]> {
  const [rows] = await pool.execute<CheckpointRow[]>(
    "SELECT * FROM dungeon_checkpoints WHERE dungeon_id = ? ORDER BY order_index ASC",
    [dungeonId],
  );
  return rows;
}

export async function findUserDungeonStatus(
  userId: number,
  dungeonId: number,
): Promise<UserDungeonRow | null> {
  const [rows] = await pool.execute<UserDungeonRow[]>(
    "SELECT * FROM user_dungeons WHERE user_id = ? AND dungeon_id = ?",
    [userId, dungeonId],
  );
  return rows[0] ?? null;
}

export async function findUserDungeonStatuses(userId: number): Promise<UserDungeonRow[]> {
  const [rows] = await pool.execute<UserDungeonRow[]>(
    "SELECT * FROM user_dungeons WHERE user_id = ?",
    [userId],
  );
  return rows;
}

export async function findUserCheckpoints(
  userId: number,
  dungeonId: number,
): Promise<UserCheckpointRow[]> {
  const [rows] = await pool.execute<UserCheckpointRow[]>(
    `SELECT udc.checkpoint_id, udc.checked, udc.checked_at
     FROM user_dungeon_checkpoints udc
     JOIN dungeon_checkpoints dc ON udc.checkpoint_id = dc.id
     WHERE udc.user_id = ? AND dc.dungeon_id = ?`,
    [userId, dungeonId],
  );
  return rows;
}

export async function startDungeon(userId: number, dungeonId: number): Promise<void> {
  await pool.execute<ResultSetHeader>(
    `INSERT INTO user_dungeons (user_id, dungeon_id, status, started_at)
     VALUES (?, ?, 'in_progress', NOW())
     ON DUPLICATE KEY UPDATE status = 'in_progress', started_at = COALESCE(started_at, NOW())`,
    [userId, dungeonId],
  );
}

export async function toggleCheckpoint(
  userId: number,
  checkpointId: number,
  checked: boolean,
): Promise<void> {
  if (checked) {
    await pool.execute<ResultSetHeader>(
      `INSERT INTO user_dungeon_checkpoints (user_id, checkpoint_id, checked, checked_at)
       VALUES (?, ?, TRUE, NOW())
       ON DUPLICATE KEY UPDATE checked = TRUE, checked_at = NOW()`,
      [userId, checkpointId],
    );
  } else {
    await pool.execute(
      "UPDATE user_dungeon_checkpoints SET checked = FALSE, checked_at = NULL WHERE user_id = ? AND checkpoint_id = ?",
      [userId, checkpointId],
    );
  }
}

export async function completeDungeon(userId: number, dungeonId: number): Promise<void> {
  await pool.execute(
    "UPDATE user_dungeons SET status = 'completed', completed_at = NOW() WHERE user_id = ? AND dungeon_id = ?",
    [userId, dungeonId],
  );
}
