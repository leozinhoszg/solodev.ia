import jwt from "jsonwebtoken";
import type { SignOptions } from "jsonwebtoken";
import { randomUUID } from "crypto";
import { env } from "../config/env.js";

interface TokenPayload {
  userId: number;
}

function parseExpiry(value: string): number {
  const match = value.match(/^(\d+)([smhd])$/);
  if (!match) return 900; // fallback 15min
  const [, num, unit] = match;
  const n = Number(num);
  switch (unit) {
    case "s": return n;
    case "m": return n * 60;
    case "h": return n * 3600;
    case "d": return n * 86400;
    default: return 900;
  }
}

export function signAccessToken(userId: number): string {
  const options: SignOptions = { expiresIn: parseExpiry(env.JWT_ACCESS_EXPIRES) };
  return jwt.sign({ userId } satisfies TokenPayload, env.JWT_SECRET, options);
}

export function signRefreshToken(userId: number): string {
  const options: SignOptions = {
    expiresIn: parseExpiry(env.JWT_REFRESH_EXPIRES),
    jwtid: randomUUID(),
  };
  return jwt.sign({ userId } satisfies TokenPayload, env.JWT_SECRET, options);
}

export function verifyToken(token: string): TokenPayload {
  return jwt.verify(token, env.JWT_SECRET) as TokenPayload;
}
