/**
 * The money rules the API and the app must apply identically, so a price shown
 * in the browser can never disagree with the price the server persists or the
 * approval gate compares to the DNE. Before this module each rule was written
 * once per side, and the duplication had already shipped a divergence between
 * persisted copy and the live UI.
 */

import type { MarkupTier } from "../schemas/organization.js";

/**
 * The tier table an organization keys against before anyone configures one.
 * KFC work is never billed at vendor cost, so an unconfigured organization
 * keys to this table rather than to zero. A saved table replaces this
 * outright — it is a fallback, not a floor, so an organization that should
 * carry no markup writes an explicit `0` tier.
 */
export const DEFAULT_MARKUP_TIERS: readonly MarkupTier[] = [
  { minAmount: 0, percent: 15 },
  { minAmount: 300_000, percent: 10 },
];

/**
 * The do-not-exceed amount seeded onto an organization when KFC is enabled and
 * no amount is configured yet, in integer cents. Enablement refuses to leave
 * the gate off by accident; an explicit amount can still replace it afterward.
 */
export const DEFAULT_DNE_AMOUNT = 150_000;

/** An organization's markup tiers, or the default when it has none of its own. */
export function resolveMarkupTierTable(
  tiers: readonly MarkupTier[] | undefined | null,
): MarkupTier[] {
  if (tiers && tiers.length > 0) return [...tiers];
  return DEFAULT_MARKUP_TIERS.map((tier) => ({ ...tier }));
}

/**
 * Keys a cost entry's markup percent from the org's lower-bound tier table by
 * the entry's vendor-cost estimate (never the ticket total): the highest row
 * whose `minAmount` the estimate meets. Null when no tiers are configured.
 */
export function keyedMarkupPercent(
  tiers: readonly MarkupTier[],
  estimateAmount: number,
): number | null {
  let match: MarkupTier | null = null;
  for (const tier of tiers) {
    if (tier.minAmount > estimateAmount) continue;
    if (match === null || tier.minAmount > match.minAmount) match = tier;
  }
  return match === null ? null : match.percent;
}

/**
 * The marked-up price of a vendor cost, in integer cents. Price is never stored
 * anywhere — it is always derived from vendor cost and markup on integer cents,
 * so the two sides can never let the vendor cost, markup, and price disagree.
 */
export function derivePrice(amount: number, percent: number): number {
  return Math.round(amount * (1 + percent / 100));
}

/** The sum of already-derived line amounts, in integer cents. */
export function billTotal(lineAmounts: readonly number[]): number {
  return lineAmounts.reduce((sum, amount) => sum + amount, 0);
}

/**
 * The tax rate (a plain float percent) a draft bill uses until a biller writes
 * its own onto the bill.
 */
export const DEFAULT_TAX_RATE = 8.375;

/**
 * Tax in integer cents on a bill's taxable subtotal. Taxable credits reduce the
 * base; when they push it negative the tax clamps at zero rather than going
 * negative — a bill never emits a tax refund.
 */
export function billTaxAmount(
  taxableSubtotalCents: number,
  ratePercent: number,
): number {
  return Math.max(0, Math.round((taxableSubtotalCents * ratePercent) / 100));
}

/** The bill's grand total in integer cents: line sum plus tax and shipping. */
export function billGrandTotal({
  subtotal,
  tax,
  shipping,
}: {
  subtotal: number;
  tax: number;
  shipping: number;
}): number {
  return subtotal + tax + shipping;
}

/**
 * Render integer cents as a currency string, e.g.
 * `formatMoney(123456, "USD")` → `"$1,234.56"`.
 *
 * Locale policy: `locale` defaults to `"en-US"` — the pin for any copy that is
 * persisted or shipped to a fixed audience (bill PDFs, emails, and the stored
 * approval/notification messages a customer reads back later). Live UI that
 * should follow the viewer passes `locale = null`, which falls back to the
 * runtime's default locale. Persisted-en-US / live-locale-aware is the
 * deliberate split; a persisted caller must never inherit the browser locale.
 */
export function formatMoney(
  cents: number,
  currency = "USD",
  locale: string | null = "en-US",
): string {
  return new Intl.NumberFormat(locale ?? undefined, {
    style: "currency",
    currency,
  }).format(cents / 100);
}
