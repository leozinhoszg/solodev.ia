import crypto from "node:crypto";
import { findUserByEmail } from "../repositories/user.repository.js";
import {
  createResetToken,
  findValidResetToken,
  markTokenUsed,
  updateUserPassword,
} from "../repositories/password-reset.repository.js";
import { hashPassword } from "../utils/hash.js";
import { signAccessToken } from "../utils/jwt.js";
import { AppError } from "../utils/AppError.js";

export async function forgotPassword(email: string): Promise<void> {
  const user = await findUserByEmail(email);
  // Always return 200 to prevent user enumeration
  if (!user) return;

  const token = crypto.randomUUID();
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

  await createResetToken(user.id, token, expiresAt);

  // TODO: send email via Resend with reset link
  // For now, log the token in dev
  if (process.env.NODE_ENV === "development") {
    console.log(`[DEV] Password reset token for ${email}: ${token}`);
  }
}

export async function resetPassword(token: string, newPassword: string) {
  const resetToken = await findValidResetToken(token);
  if (!resetToken) {
    throw new AppError(400, "Token inválido ou expirado", "INVALID_RESET_TOKEN");
  }

  const hashed = await hashPassword(newPassword);
  await updateUserPassword(resetToken.user_id, hashed);
  await markTokenUsed(token);

  const accessToken = signAccessToken(resetToken.user_id);
  return { accessToken };
}
