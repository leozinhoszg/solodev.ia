import api from "./api";

export interface CheckoutResult {
  sessionId: string;
  url: string;
}

export interface SubscriptionStatus {
  active: boolean;
  plan: "free" | "pro";
  currentPeriodEnd?: string;
  cancelAtPeriodEnd?: boolean;
}

export async function createCheckout(successUrl: string, cancelUrl: string): Promise<CheckoutResult> {
  const { data } = await api.post<{ success: true; data: CheckoutResult }>("/payments/create-checkout", {
    successUrl,
    cancelUrl,
  });
  return data.data;
}

export async function getSubscriptionStatus(): Promise<SubscriptionStatus> {
  const { data } = await api.get<{ success: true; data: SubscriptionStatus }>("/payments/status");
  return data.data;
}
