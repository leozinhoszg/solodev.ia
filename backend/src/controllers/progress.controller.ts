import type { Request, Response, NextFunction } from "express";
import * as progressService from "../services/progress.service.js";

export async function completeLesson(req: Request, res: Response, next: NextFunction) {
  try {
    const lessonId = Number(req.params.lessonId);
    const result = await progressService.completeLesson(req.userId!, lessonId);
    res.json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
}

export async function getDashboard(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await progressService.getDashboardData(req.userId!);
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
}
