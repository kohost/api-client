/**
 * The Service contract term rules the API and the app must apply identically:
 * the cross-org ledger counts what is ending soon on the server, and every row
 * the browser flags reads the same rule, so a count and the rows it counts
 * cannot disagree.
 *
 * Contract dates are UTC calendar days.
 */

type DateLike = string | Date;

export const ENDING_SOON_DAYS = 30;

const DAY_MS = 86_400_000;

type TermSource = {
  status: string;
  endsAt?: DateLike | null;
};

/**
 * Days from today to a contract's end, in whole UTC days. Negative once the
 * end date has passed but the contract has not yet been read as ended.
 */
export function daysUntilEnd(
  endsAt: DateLike | null | undefined,
  today: Date = new Date(),
): number | null {
  if (!endsAt) return null;
  const end = new Date(endsAt);
  if (Number.isNaN(end.getTime())) return null;
  const endDay = Date.UTC(
    end.getUTCFullYear(),
    end.getUTCMonth(),
    end.getUTCDate(),
  );
  const todayDay = Date.UTC(
    today.getUTCFullYear(),
    today.getUTCMonth(),
    today.getUTCDate(),
  );
  return Math.round((endDay - todayDay) / DAY_MS);
}

/** Only a live contract with an end date in sight; open-ended is never flagged, and an expired one reads as expired instead. */
export function isEndingSoon(
  contract: TermSource,
  today: Date = new Date(),
): boolean {
  if (contract.status !== "active") return false;
  const days = daysUntilEnd(contract.endsAt, today);
  return days !== null && days >= 0 && days <= ENDING_SOON_DAYS;
}

/**
 * An active contract past its last day. It stays active until billing staff
 * add due contract costs, which ends it.
 */
export function isExpired(
  contract: TermSource,
  today: Date = new Date(),
): boolean {
  if (contract.status !== "active") return false;
  const days = daysUntilEnd(contract.endsAt, today);
  return days !== null && days < 0;
}
