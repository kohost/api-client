/**
 * The bill rules the API and the app must apply identically: the rate a bill
 * taxes at, its grand total, and the date it reads as effective. The API's send
 * gate, its PDF render and its cross-org sort key all derive from these, and so
 * does every total the browser prints — the ledger row, the org bill list, the
 * detail view. Written once here so a total shown next to a sort order the
 * server produced cannot disagree with it.
 *
 * Structural types carry just the fields a rule reads, so schema-derived
 * documents assign without adapters.
 */

import {
  DEFAULT_TAX_RATE,
  billGrandTotal,
  billTaxAmount,
  billTotal,
} from "./money.js";

export type BillTaxFields = {
  taxRate?: number | null;
  shippingAmount?: number | null;
};

/**
 * The rate a bill actually taxes at: its own explicit rate, else the platform
 * default while drafting. An exempt org always resolves to zero.
 */
export function effectiveTaxRate(
  bill: BillTaxFields,
  taxExempt: boolean,
): number {
  if (taxExempt) return 0;
  return bill.taxRate ?? DEFAULT_TAX_RATE;
}

export type TaxableLine = { amount?: number | null; taxable?: boolean };

/** The sum of the taxable lines' amounts — credits included — in integer cents. */
export function taxableSubtotal(lines: readonly TaxableLine[]): number {
  return billTotal(
    lines.filter((line) => line.taxable).map((line) => line.amount ?? 0),
  );
}

/**
 * Subtotal, tax, shipping, and grand total for one bill, from already-resolved
 * line amounts — the single derivation the document, the send gate, and the org
 * projection all share.
 */
export function billTotals(
  lines: readonly TaxableLine[],
  bill: BillTaxFields,
  taxExempt: boolean,
): {
  subtotal: number;
  taxRate: number;
  taxAmount: number;
  shippingAmount: number;
  total: number;
} {
  const subtotal = billTotal(lines.map((line) => line.amount ?? 0));
  const taxRate = effectiveTaxRate(bill, taxExempt);
  const taxAmount = billTaxAmount(taxableSubtotal(lines), taxRate);
  const shippingAmount = bill.shippingAmount ?? 0;
  return {
    subtotal,
    taxRate,
    taxAmount,
    shippingAmount,
    total: billGrandTotal({
      subtotal,
      tax: taxAmount,
      shipping: shippingAmount,
    }),
  };
}

/**
 * The exemption a bill's totals resolve with: while drafting it live-reads
 * from the org; once sent the bill carries its own snapshot, frozen at
 * mark-sent. The one resolution the document render, the detail read, and the
 * ledger all share, so their totals cannot drift.
 */
export function resolveBillTaxExempt(
  bill: { status: string; taxExempt?: boolean | null },
  orgTaxExempt: boolean,
): boolean {
  return bill.status === "draft" ? orgTaxExempt : (bill.taxExempt ?? false);
}

export type SettledBillTotalSource = BillTaxFields & {
  status: string;
  taxExempt?: boolean | null;
  lines?: readonly TaxableLine[] | null;
};

/**
 * A bill's grand total as a summary row shows it, from the snapshot the bill
 * itself carries. Null for a draft — draft cost lines hold no amount until
 * mark-sent resolves and freezes them, so a draft has no honest total to show
 * and no org read is reached for. A settled (sent/paid/void) bill's frozen
 * lines, rate, and exemption yield exactly the total the detail document
 * prints.
 */
export function settledBillTotal(bill: SettledBillTotalSource): number | null {
  if (bill.status === "draft") return null;
  return billTotals(bill.lines ?? [], bill, resolveBillTaxExempt(bill, false))
    .total;
}

export type BillEffectiveDateSource = {
  sentAt?: Date | string | null;
  createdAt?: Date | string | null;
};

/**
 * The date a bill reads as: when it was sent once it has been, else when it was
 * started. This is the key the cross-org ledger sorts, filters and pages on, so
 * the server evaluates the same rule in Mongo (`$ifNull: ["$sentAt",
 * "$createdAt"]`) to order a page. Returned as an ISO string; a bill with
 * neither date falls to the epoch rather than to an unsortable null.
 */
export function billEffectiveDate(bill: BillEffectiveDateSource): string {
  const value = bill.sentAt ?? bill.createdAt ?? 0;
  return new Date(value).toISOString();
}
