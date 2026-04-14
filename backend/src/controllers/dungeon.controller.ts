import type { Request, Response, NextFunction } from "express";
import * as dungeonService from "../services/dungeon.service.js";

export async function list(req: Request, res: Response, next: NextFunction) {
  try {
    const dungeons = await dungeonService.listDungeons(req.userId!);
    res.json({ success: true, data: dungeons });
  } catch (err) {
    next(err);
  }
}

export async function detail(req: Request, res: Response, next: NextFunction) {
  try {
    const slug = req.params.slug as string;
    const dungeon = await dungeonService.getDungeonDetail(req.userId!, slug);
    res.json({ success: true, data: dungeon });
  } catch (err) {
    next(err);
  }
}

export async function start(req: Request, res: Response, next: NextFunction) {
  try {
    const slug = req.params.slug as string;
    const result = await dungeonService.start(req.userId!, slug);
    res.json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
}

export async function checkCheckpoint(req: Request, res: Response, next: NextFunction) {
  try {
    const slug = req.params.slug as string;
    const checkpointId = Number(req.params.checkpointId);
    const { checked } = req.body as { checked: boolean };
    const result = await dungeonService.checkCheckpoint(req.userId!, slug, checkpointId, checked);
    res.json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
}

export async function complete(req: Request, res: Response, next: NextFunction) {
  try {
    const slug = req.params.slug as string;
    const result = await dungeonService.complete(req.userId!, slug);
    res.json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
}
