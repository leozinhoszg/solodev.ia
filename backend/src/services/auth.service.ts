import { AppError } from "../utils/AppError.js";
import { hashPassword, verifyPassword } from "../utils/hash.js";
import { signAccessToken, signRefreshToken, verifyToken } from "../utils/jwt.js";
import {
  createUser,
  findUserByEmail,
  findUserById,
  saveRefreshToken,
  findRefreshToken,
  deleteRefreshToken,
  deleteAllRefreshTokens,
} from "../repositories/user.repository.js";

function refreshTokenExpiry(): Date {
  const d = new Date();
  d.setDate(d.getDate() + 7);
  return d;
}

export async function register(name: string, email: string, password: string) {
  const existing = await findUserByEmail(email);
  if (existing) {
    throw new AppError(409, "E-mail já cadastrado", "EMAIL_EXISTS");
  }

  const hashed = await hashPassword(password);
  const userId = await createUser(name, email, hashed);

  const accessToken = signAccessToken(userId);
  const refreshToken = signRefreshToken(userId);
  await saveRefreshToken(userId, refreshToken, refreshTokenExpiry());

  return { accessToken, refreshToken, userId };
}

export async function login(email: string, password: string) {
  const user = await findUserByEmail(email);
  if (!user) {
    throw new AppError(401, "Credenciais inválidas", "INVALID_CREDENTIALS");
  }

  const valid = await verifyPassword(user.password, password);
  if (!valid) {
    throw new AppError(401, "Credenciais inválidas", "INVALID_CREDENTIALS");
  }

  const accessToken = signAccessToken(user.id);
  const refreshToken = signRefreshToken(user.id);
  await saveRefreshToken(user.id, refreshToken, refreshTokenExpiry());

  return { accessToken, refreshToken, userId: user.id };
}

export async function refresh(token: string) {
  const stored = await findRefreshToken(token);
  if (!stored) {
    throw new AppError(401, "Refresh token inválido", "INVALID_REFRESH_TOKEN");
  }

  try {
    verifyToken(token);
  } catch {
    await deleteRefreshToken(token);
    throw new AppError(401, "Refresh token expirado", "EXPIRED_REFRESH_TOKEN");
  }

  // Rotate: delete old, issue new
  await deleteRefreshToken(token);

  const accessToken = signAccessToken(stored.user_id);
  const newRefreshToken = signRefreshToken(stored.user_id);
  await saveRefreshToken(stored.user_id, newRefreshToken, refreshTokenExpiry());

  return { accessToken, refreshToken: newRefreshToken };
}

export async function logout(token: string) {
  await deleteRefreshToken(token);
}

export async function getMe(userId: number) {
  const user = await findUserById(userId);
  if (!user) {
    throw new AppError(404, "Usuário não encontrado", "USER_NOT_FOUND");
  }

  const { password: _, ...safeUser } = user;
  return safeUser;
}
