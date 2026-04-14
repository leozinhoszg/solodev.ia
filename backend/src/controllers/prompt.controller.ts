import type { Request, Response, NextFunction } from "express";
import * as promptService from "../services/prompt.service.js";

export async function submit(req: Request, res: Response, next: NextFunction) {
  try {
    const { promptText, lessonId } = req.body as {
      promptText: string;
      lessonId?: number;
    };
    const result = await promptService.submitPrompt(
      req.userId!,
      promptText,
      lessonId ?? null,
    );
    res.json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
}

export async function history(req: Request, res: Response, next: NextFunction) {
  try {
    const submissions = await promptService.getHistory(req.userId!);
    res.json({ success: true, data: submissions });
  } catch (err) {
    next(err);
  }
}
