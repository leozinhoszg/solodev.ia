import Stripe from "stripe";
import { env } from "../config/env.js";
import { AppError } from "../utils/AppError.js";
import {
  findActiveSubscription,
  findSubscriptionByProviderId,
  createSubscription,
  updateSubscriptionStatus,
  updateUserPlan,
  savePaymentEvent,
} from "../repositories/payment.repository.js";
import { findUserById } from "../repositories/user.repository.js";

function getStripe(): Stripe {
  if (!env.STRIPE_SECRET_KEY) {
    throw new AppError(500, "Stripe não configurado", "STRIPE_NOT_CONFIGURED");
  }
  return new Stripe(env.STRIPE_SECRET_KEY);
}

export async function createCheckoutSession(userId: number, successUrl: string, cancelUrl: string) {
  const stripe = getStripe();
  const user = await findUserById(userId);
  if (!user) throw new AppError(404, "Usuário não encontrado", "USER_NOT_FOUND");

  const existing = await findActiveSubscription(userId);
  if (existing) {
    throw new AppError(400, "Você já possui uma assinatura ativa", "ALREADY_SUBSCRIBED");
  }

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    customer_email: user.email,
    metadata: { userId: String(userId) },
    line_items: [
      {
        price_data: {
          currency: "brl",
          product_data: {
            name: "SoloDev.AI — Awakening Pro",
            description: "Acesso completo: Fases 2-4, Lab de Prompts ilimitado, Dungeons, Certificado S-Rank",
          },
          unit_amount: 4700, // R$ 47,00
          recurring: { interval: "month" },
        },
        quantity: 1,
      },
    ],
    success_url: successUrl,
    cancel_url: cancelUrl,
  });

  return { sessionId: session.id, url: session.url };
}

export async function handleWebhook(rawBody: Buffer, signature: string) {
  const stripe = getStripe();
  if (!env.STRIPE_WEBHOOK_SECRET) {
    throw new AppError(500, "Webhook secret não configurado", "WEBHOOK_NOT_CONFIGURED");
  }

  const event = stripe.webhooks.constructEvent(rawBody, signature, env.STRIPE_WEBHOOK_SECRET);

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = Number(session.metadata?.userId);
      if (!userId) break;

      const subResponse = await stripe.subscriptions.retrieve(session.subscription as string);
      const subData = subResponse as unknown as { id: string; customer: string; current_period_start: number; current_period_end: number };
      const periodEnd = new Date(subData.current_period_end * 1000);
      const periodStart = new Date(subData.current_period_start * 1000);

      const subId = await createSubscription(
        userId,
        "stripe",
        subData.customer as string,
        subData.id,
        "active",
        periodStart,
        periodEnd,
      );

      await updateUserPlan(userId, "pro", periodEnd);
      await savePaymentEvent(userId, subId, event.type, "stripe", event.id, event.data.object);
      break;
    }

    case "invoice.payment_succeeded": {
      const invoiceObj = event.data.object as unknown as Record<string, unknown>;
      const subId = invoiceObj.subscription as string;
      if (!subId) break;

      const sub = await findSubscriptionByProviderId(subId);
      if (!sub) break;

      const subResponse = await stripe.subscriptions.retrieve(subId);
      const subData = subResponse as unknown as { current_period_end: number };
      const periodEnd = new Date(subData.current_period_end * 1000);

      await updateSubscriptionStatus(subId, "active", periodEnd);
      await updateUserPlan(sub.user_id, "pro", periodEnd);
      await savePaymentEvent(sub.user_id, sub.id, event.type, "stripe", event.id, event.data.object);
      break;
    }

    case "customer.subscription.deleted": {
      const subscription = event.data.object as Stripe.Subscription;
      const sub = await findSubscriptionByProviderId(subscription.id);
      if (!sub) break;

      await updateSubscriptionStatus(subscription.id, "cancelled");
      await updateUserPlan(sub.user_id, "free", null);
      await savePaymentEvent(sub.user_id, sub.id, event.type, "stripe", event.id, event.data.object);
      break;
    }

    case "invoice.payment_failed": {
      const failedInvoice = event.data.object as unknown as Record<string, unknown>;
      const subId = failedInvoice.subscription as string;
      if (!subId) break;

      const sub = await findSubscriptionByProviderId(subId);
      if (!sub) break;

      await updateSubscriptionStatus(subId, "past_due");
      await savePaymentEvent(sub.user_id, sub.id, event.type, "stripe", event.id, event.data.object);
      break;
    }
  }

  return { received: true };
}

export async function getSubscriptionStatus(userId: number) {
  const sub = await findActiveSubscription(userId);
  if (!sub) return { active: false, plan: "free" as const };

  return {
    active: true,
    plan: "pro" as const,
    currentPeriodEnd: sub.current_period_end,
    cancelAtPeriodEnd: sub.cancel_at_period_end,
  };
}
