import type { Request, Response, NextFunction } from "express";
import * as resetService from "../services/password-reset.service.js";
import { forgotPasswordSchema, resetPasswordSchema } from "../utils/validate.js";

export async function forgotPassword(req: Request, res: Response, next: NextFunction) {
  try {
    const { email } = forgotPasswordSchema.parse(req.body);
    await resetService.forgotPassword(email);
    // Always 200 to prevent user enumeration
    res.json({ success: true, data: null });
  } catch (err) {
    next(err);
  }
}

export async function resetPassword(req: Request, res: Response, next: NextFunction) {
  try {
    const data = resetPasswordSchema.parse(req.body);
    const result = await resetService.resetPassword(data.token, data.newPassword);
    res.json({ success: true, data: { accessToken: result.accessToken } });
  } catch (err) {
    next(err);
  }
}
