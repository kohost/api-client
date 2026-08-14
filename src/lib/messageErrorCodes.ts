export const MESSAGE_ERROR_CATEGORIES = [
  "optedOut",
  "carrierFiltered",
  "rateCapped",
  "expired",
] as const;

export type MessageErrorCategory = (typeof MESSAGE_ERROR_CATEGORIES)[number];

// Raw vendor code → display category. Kept for debugging; not shown in the SOS
// UI. Codes locked in kohost/kohost#332 (Twilio). `expired` has no confirmed
// code yet — the issues recommend a short ValidityPeriod but never lock the
// vendor code — so it remains a category with no mapping until confirmed.
const CODE_TO_CATEGORY: Record<string, MessageErrorCategory> = {
  "21610": "optedOut",
  "30007": "carrierFiltered",
  "30023": "rateCapped",
  "30027": "rateCapped",
};

export function categoryForMessageErrorCode(
  code: string | null | undefined,
): MessageErrorCategory | null {
  if (!code) return null;
  return CODE_TO_CATEGORY[code.trim()] ?? null;
}

export function isMessageErrorCategory(
  value: string | null | undefined,
): value is MessageErrorCategory {
  return (
    typeof value === "string" &&
    (MESSAGE_ERROR_CATEGORIES as readonly string[]).includes(value)
  );
}
