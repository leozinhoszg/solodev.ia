import type { ResultSetHeader, RowDataPacket } from "mysql2";
import { pool } from "../config/database.js";

export interface UserRow extends RowDataPacket {
  id: number;
  name: string;
  email: string;
  password: string;
  avatar_url: string | null;
  plan: "free" | "pro";
  role: "user" | "admin";
  plan_expires_at: Date | null;
  current_rank: string;
  total_xp: number;
  created_at: Date;
  updated_at: Date;
}

export async function findUserByEmail(email: string): Promise<UserRow | null> {
  const [rows] = await pool.execute<UserRow[]>(
    "SELECT * FROM users WHERE email = ?",
    [email],
  );
  return rows[0] ?? null;
}

export async function findUserById(id: number): Promise<UserRow | null> {
  const [rows] = await pool.execute<UserRow[]>(
    "SELECT * FROM users WHERE id = ?",
    [id],
  );
  return rows[0] ?? null;
}

export async function createUser(
  name: string,
  email: string,
  hashedPassword: string,
): Promise<number> {
  const [result] = await pool.execute<ResultSetHeader>(
    "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
    [name, email, hashedPassword],
  );
  return result.insertId;
}

// Refresh tokens

export interface RefreshTokenRow extends RowDataPacket {
  id: number;
  user_id: number;
  token: string;
  expires_at: Date;
}

export async function saveRefreshToken(
  userId: number,
  token: string,
  expiresAt: Date,
): Promise<void> {
  await pool.execute(
    "INSERT INTO refresh_tokens (user_id, token, expires_at) VALUES (?, ?, ?)",
    [userId, token, expiresAt],
  );
}

export async function findRefreshToken(
  token: string,
): Promise<RefreshTokenRow | null> {
  const [rows] = await pool.execute<RefreshTokenRow[]>(
    "SELECT * FROM refresh_tokens WHERE token = ? AND expires_at > NOW()",
    [token],
  );
  return rows[0] ?? null;
}

export async function deleteRefreshToken(token: string): Promise<void> {
  await pool.execute("DELETE FROM refresh_tokens WHERE token = ?", [token]);
}

export async function deleteAllRefreshTokens(userId: number): Promise<void> {
  await pool.execute("DELETE FROM refresh_tokens WHERE user_id = ?", [userId]);
}
