import type { ResultSetHeader, RowDataPacket } from "mysql2";
import { pool } from "../config/database.js";

interface ResetTokenRow extends RowDataPacket {
  id: number;
  user_id: number;
  token: string;
  used: boolean;
  expires_at: Date;
}

export async function createResetToken(
  userId: number,
  token: string,
  expiresAt: Date,
): Promise<void> {
  await pool.execute<ResultSetHeader>(
    "INSERT INTO password_reset_tokens (user_id, token, expires_at) VALUES (?, ?, ?)",
    [userId, token, expiresAt],
  );
}

export async function findValidResetToken(
  token: string,
): Promise<ResetTokenRow | null> {
  const [rows] = await pool.execute<ResetTokenRow[]>(
    "SELECT * FROM password_reset_tokens WHERE token = ? AND used = FALSE AND expires_at > NOW()",
    [token],
  );
  return rows[0] ?? null;
}

export async function markTokenUsed(token: string): Promise<void> {
  await pool.execute(
    "UPDATE password_reset_tokens SET used = TRUE WHERE token = ?",
    [token],
  );
}

export async function updateUserPassword(
  userId: number,
  hashedPassword: string,
): Promise<void> {
  await pool.execute("UPDATE users SET password = ? WHERE id = ?", [
    hashedPassword,
    userId,
  ]);
}
