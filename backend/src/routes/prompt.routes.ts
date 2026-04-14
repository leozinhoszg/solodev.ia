import { Router } from "express";
import * as promptCtrl from "../controllers/prompt.controller.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.post("/submit", requireAuth, promptCtrl.submit);
router.get("/history", requireAuth, promptCtrl.history);

export default router;
