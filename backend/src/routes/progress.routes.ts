import { Router } from "express";
import * as progressCtrl from "../controllers/progress.controller.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.get("/dashboard", requireAuth, progressCtrl.getDashboard);
router.post("/lessons/:lessonId/complete", requireAuth, progressCtrl.completeLesson);

export default router;
