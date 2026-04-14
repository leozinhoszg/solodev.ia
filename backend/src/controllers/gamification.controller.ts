import type { Request, Response, NextFunction } from "express";
import * as gamificationService from "../services/gamification.service.js";

export async function getData(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await gamificationService.getGamificationData(req.userId!);
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
}

export async function recordActivity(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await gamificationService.recordActivity(req.userId!);
    res.json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
}

export async function completeQuest(req: Request, res: Response, next: NextFunction) {
  try {
    const slug = req.params.slug as string;
    const result = await gamificationService.tryCompleteQuest(req.userId!, slug);
    if (!result) {
      res.status(404).json({ success: false, error: { message: "Quest não encontrada", code: "QUEST_NOT_FOUND" } });
      return;
    }
    res.json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
}
