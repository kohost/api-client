/**
 * The KFC stats date-window contract, shared verbatim by the API endpoint and
 * the admin console so a `from`/`to` pair means the same window on both sides.
 * The server owns the authoritative resolution — it layers range validation and
 * instant conversion on top — while the client owns the preset and comparison
 * math the server has no notion of. Both must agree on the *constants and the
 * fallback*, though: the default view carries no dates in the URL, so the client
 * has to reconstruct the exact window the server would have chosen. Publishing
 * them once here is what keeps the two from silently disagreeing when the window
 * default or the anchor zone changes.
 */

/** Calendar-day windows are anchored to this fixed zone (#360). */
export const KFC_STATS_TIMEZONE = "America/Los_Angeles";

/** Inclusive span of the default window when no `from` is given. */
export const KFC_STATS_DEFAULT_WINDOW_DAYS = 30;

/**
 * Widest inclusive span a caller may request — a full leap year. Cross-org
 * federated aggregation cost scales with the window, so this caps the work an
 * arbitrary caller can ask for.
 */
export const KFC_STATS_MAX_RANGE_DAYS = 366;

/** A resolved inclusive day window as `YYYY-MM-DD` civil-date labels. */
export interface KfcStatsWindowBounds {
  from: string;
  to: string;
}

const DAY_MS = 86_400_000;

// Civil-date arithmetic on UTC-anchored instants so a day shift never drifts
// across a DST boundary; only the calendar fields are ever read back out.
function shiftDateLabel(label: string, days: number): string {
  const [year, month, day] = label.split("-").map(Number);
  const shifted = new Date(Date.UTC(year, month - 1, day) + days * DAY_MS);
  const y = String(shifted.getUTCFullYear()).padStart(4, "0");
  const m = String(shifted.getUTCMonth() + 1).padStart(2, "0");
  const d = String(shifted.getUTCDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/**
 * The fallback both sides apply to a partial window: a missing `to` is `today`
 * (already resolved to the anchor zone by the caller), and a missing `from` is
 * the day `KFC_STATS_DEFAULT_WINDOW_DAYS - 1` before `to`, so the default view
 * spans that many days inclusive of today. Explicit bounds pass through
 * untouched; parsing, ordering, and span limits are the caller's to enforce.
 */
export function resolveKfcStatsWindowBounds(
  window: { from?: string | null; to?: string | null },
  today: string,
): KfcStatsWindowBounds {
  const to = window.to ?? today;
  const from =
    window.from ?? shiftDateLabel(to, -(KFC_STATS_DEFAULT_WINDOW_DAYS - 1));
  return { from, to };
}
