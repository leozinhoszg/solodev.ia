import type { ResultSetHeader, RowDataPacket } from "mysql2";
import { pool } from "../config/database.js";

export interface SubscriptionRow extends RowDataPacket {
  id: number;
  user_id: number;
  provider: string;
  provider_customer_id: string | null;
  provider_sub_id: string | null;
  status: "active" | "cancelled" | "past_due" | "trialing";
  plan: string;
  current_period_start: Date;
  current_period_end: Date;
  cancel_at_period_end: boolean;
}

export async function findActiveSubscription(userId: number): Promise<SubscriptionRow | null> {
  const [rows] = await pool.execute<SubscriptionRow[]>(
    "SELECT * FROM subscriptions WHERE user_id = ? AND status = 'active' ORDER BY id DESC LIMIT 1",
    [userId],
  );
  return rows[0] ?? null;
}

export async function findSubscriptionByProviderId(providerSubId: string): Promise<SubscriptionRow | null> {
  const [rows] = await pool.execute<SubscriptionRow[]>(
    "SELECT * FROM subscriptions WHERE provider_sub_id = ?",
    [providerSubId],
  );
  return rows[0] ?? null;
}

export async function createSubscription(
  userId: number,
  provider: string,
  customerId: string,
  subId: string,
  status: string,
  periodStart: Date,
  periodEnd: Date,
): Promise<number> {
  const [result] = await pool.execute<ResultSetHeader>(
    `INSERT INTO subscriptions (user_id, provider, provider_customer_id, provider_sub_id, status, current_period_start, current_period_end)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [userId, provider, customerId, subId, status, periodStart, periodEnd],
  );
  return result.insertId;
}

export async function updateSubscriptionStatus(
  providerSubId: string,
  status: string,
  periodEnd?: Date,
  cancelAtPeriodEnd?: boolean,
): Promise<void> {
  const updates: string[] = ["status = ?"];
  const params: (string | Date | boolean)[] = [status];

  if (periodEnd) {
    updates.push("current_period_end = ?");
    params.push(periodEnd);
  }
  if (cancelAtPeriodEnd !== undefined) {
    updates.push("cancel_at_period_end = ?");
    params.push(cancelAtPeriodEnd);
  }

  params.push(providerSubId);
  await pool.execute(
    `UPDATE subscriptions SET ${updates.join(", ")} WHERE provider_sub_id = ?`,
    params,
  );
}

export async function updateUserPlan(userId: number, plan: "free" | "pro", expiresAt: Date | null): Promise<void> {
  await pool.execute(
    "UPDATE users SET plan = ?, plan_expires_at = ? WHERE id = ?",
    [plan, expiresAt, userId],
  );
}

export async function savePaymentEvent(
  userId: number | null,
  subscriptionId: number | null,
  eventType: string,
  provider: string,
  providerEventId: string,
  payload: unknown,
): Promise<void> {
  await pool.execute(
    `INSERT IGNORE INTO payment_events (user_id, subscription_id, event_type, provider, provider_event_id, payload)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [userId, subscriptionId, eventType, provider, providerEventId, JSON.stringify(payload)],
  );
}
