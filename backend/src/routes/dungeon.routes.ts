import { Router } from "express";
import * as dungeonCtrl from "../controllers/dungeon.controller.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.get("/", requireAuth, dungeonCtrl.list);
router.get("/:slug", requireAuth, dungeonCtrl.detail);
router.post("/:slug/start", requireAuth, dungeonCtrl.start);
router.post("/:slug/checkpoints/:checkpointId", requireAuth, dungeonCtrl.checkCheckpoint);
router.post("/:slug/complete", requireAuth, dungeonCtrl.complete);

export default router;
