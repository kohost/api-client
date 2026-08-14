export const DELIVERY_OUTCOMES = ["sent", "delivered", "failed"] as const;

export type DeliveryOutcome = (typeof DELIVERY_OUTCOMES)[number];

// Coarse outcome bucket for a raw sms/email vendor status. `sent` covers
// accepted/in-flight states that are not yet terminal; `delivered` covers
// terminal success (including read/open/click, and the post-delivery
// unsubscribe/spam-report signals — a message was delivered before the
// recipient could unsubscribe or mark it spam); `failed` covers terminal
// failure. Inbound statuses (receiving/received) and other signals with no
// bearing on reach return null and are not counted.
const STATUS_TO_OUTCOME: Record<string, DeliveryOutcome> = {
  queued: "sent",
  accepted: "sent",
  sending: "sent",
  sent: "sent",
  deferred: "sent",

  delivered: "delivered",
  read: "delivered",
  opened: "delivered",
  clicked: "delivered",
  unsubscribed: "delivered",
  spamReport: "delivered",

  failed: "failed",
  undelivered: "failed",
  bounced: "failed",
  blocked: "failed",
};

export function deliveryOutcomeForStatus(
  status: string | null | undefined,
): DeliveryOutcome | null {
  if (!status) return null;
  return STATUS_TO_OUTCOME[status] ?? null;
}
