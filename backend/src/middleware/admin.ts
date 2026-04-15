import type { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError.js";
import { findUserById } from "../repositories/user.repository.js";

export async function requireAdmin(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  try {
    if (!req.userId) {
      throw new AppError(401, "Não autenticado", "NO_AUTH");
    }
    const user = await findUserById(req.userId);
    if (!user || user.role !== "admin") {
      throw new AppError(403, "Acesso negado: admin requerido", "NOT_ADMIN");
    }
    next();
  } catch (err) {
    next(err);
  }
}
