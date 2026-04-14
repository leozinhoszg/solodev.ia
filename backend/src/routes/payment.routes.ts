import { Router, raw } from "express";
import * as paymentCtrl from "../controllers/payment.controller.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.post("/create-checkout", requireAuth, paymentCtrl.createCheckout);
router.get("/status", requireAuth, paymentCtrl.status);

// Webhook needs raw body for signature verification
router.post("/webhook", raw({ type: "application/json" }), paymentCtrl.webhook);

export default router;
