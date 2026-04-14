import type { Request, Response, NextFunction } from "express";
import * as paymentService from "../services/payment.service.js";

export async function createCheckout(req: Request, res: Response, next: NextFunction) {
  try {
    const { successUrl, cancelUrl } = req.body as { successUrl: string; cancelUrl: string };
    const result = await paymentService.createCheckoutSession(req.userId!, successUrl, cancelUrl);
    res.json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
}

export async function webhook(req: Request, res: Response, next: NextFunction) {
  try {
    const signature = req.headers["stripe-signature"] as string;
    const result = await paymentService.handleWebhook(req.body as Buffer, signature);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

export async function status(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await paymentService.getSubscriptionStatus(req.userId!);
    res.json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
}
