import { Router } from "express";
import * as gamCtrl from "../controllers/gamification.controller.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.get("/", requireAuth, gamCtrl.getData);
router.post("/activity", requireAuth, gamCtrl.recordActivity);
router.post("/quests/:slug/complete", requireAuth, gamCtrl.completeQuest);

export default router;
