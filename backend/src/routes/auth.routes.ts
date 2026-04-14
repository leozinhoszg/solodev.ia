import { Router } from "express";
import * as authCtrl from "../controllers/auth.controller.js";
import * as resetCtrl from "../controllers/password-reset.controller.js";
import { requireAuth } from "../middleware/auth.js";
import { authLimiter } from "../middleware/rateLimiter.js";

const router = Router();

router.post("/register", authLimiter, authCtrl.register);
router.post("/login", authLimiter, authCtrl.login);
router.post("/refresh", authCtrl.refresh);
router.post("/logout", authCtrl.logout);
router.get("/me", requireAuth, authCtrl.me);
router.post("/forgot-password", authLimiter, resetCtrl.forgotPassword);
router.post("/reset-password", authLimiter, resetCtrl.resetPassword);

export default router;
