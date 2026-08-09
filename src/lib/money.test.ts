import { describe, expect, it } from "vitest";

import {
  DEFAULT_MARKUP_TIERS,
  DEFAULT_TAX_RATE,
  billGrandTotal,
  billTaxAmount,
  billTotal,
  derivePrice,
  formatMoney,
  resolveMarkupTierTable,
} from "./money.js";

describe("resolveMarkupTierTable", () => {
  it("defaults an unconfigured organization to a flat 10%", () => {
    expect(resolveMarkupTierTable(undefined)).toEqual([
      { minAmount: 0, percent: 10 },
    ]);
    expect(resolveMarkupTierTable(null)).toEqual([
      { minAmount: 0, percent: 10 },
    ]);
    expect(resolveMarkupTierTable([])).toEqual([{ minAmount: 0, percent: 10 }]);
  });

  it("lets a saved table replace the default outright", () => {
    const tiers = [
      { minAmount: 0, percent: 20 },
      { minAmount: 500_000, percent: 15 },
    ];
    expect(resolveMarkupTierTable(tiers)).toEqual(tiers);
  });

  it("honors an explicit zero tier rather than reading it as unconfigured", () => {
    expect(resolveMarkupTierTable([{ minAmount: 0, percent: 0 }])).toEqual([
      { minAmount: 0, percent: 0 },
    ]);
  });

  it("hands back a copy, so a caller cannot mutate the shared default", () => {
    const resolved = resolveMarkupTierTable([]);
    resolved[0].percent = 99;
    expect(DEFAULT_MARKUP_TIERS[0].percent).toBe(10);
  });
});

describe("derivePrice", () => {
  // The golden vectors both sides must agree on. Any drift in the rounding rule
  // (integer cents, round half up) fails here before it can ship a client that
  // disagrees with the server's persisted price and the DNE gate.
  const vectors: Array<[amount: number, percent: number, price: number]> = [
    [520_000, 10, 572_000],
    [499, 0, 499],
    [101, 10, 111], // 111.1 rounds down
    [105, 10, 116], // 115.5 rounds up
    [33, 10, 36], // 36.3 rounds down
    [100, 12.5, 113], // 112.5 rounds up
    [100, 12.4, 112], // 112.4 rounds down
    [0, 25, 0],
    [5000, 0, 5000],
  ];

  it.each(vectors)(
    "derivePrice(%i, %f) === %i",
    (amount, percent, price) => {
      expect(derivePrice(amount, percent)).toBe(price);
    },
  );
});

describe("billTotal", () => {
  it("sums line amounts, including credits", () => {
    expect(billTotal([520000, 15000, -20000])).toBe(515000);
  });

  it("is zero for no lines", () => {
    expect(billTotal([])).toBe(0);
  });
});

describe("billTaxAmount", () => {
  it("rounds to the nearest cent", () => {
    // 10000 * 8.375% = 837.5 → 838
    expect(billTaxAmount(10000, DEFAULT_TAX_RATE)).toBe(838);
    expect(billTaxAmount(100, 8.375)).toBe(8);
  });

  it("is zero at a zero rate", () => {
    expect(billTaxAmount(10000, 0)).toBe(0);
  });

  it("reduces with a partially credited base", () => {
    expect(billTaxAmount(10000 - 2000, 10)).toBe(800);
  });

  it("clamps a negative taxable base to zero tax", () => {
    expect(billTaxAmount(-5000, 8.375)).toBe(0);
  });
});

describe("billGrandTotal", () => {
  it("adds tax and shipping to the line subtotal", () => {
    expect(billGrandTotal({ subtotal: 10000, tax: 838, shipping: 1500 })).toBe(
      12338,
    );
  });
});

describe("formatMoney", () => {
  it("pins persisted copy to en-US by default", () => {
    expect(formatMoney(123456, "USD")).toBe("$1,234.56");
  });

  it("defaults the currency to USD", () => {
    expect(formatMoney(5000)).toBe("$50.00");
  });

  it("honors a non-USD currency under the en-US pin", () => {
    expect(formatMoney(123456, "EUR")).toBe("€1,234.56");
  });

  it("follows the runtime locale when locale is null", () => {
    // The null branch must not re-pin to en-US; it defers to whatever the
    // runtime's default formatter produces.
    const runtimeDefault = new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: "USD",
    }).format(1234.56);
    expect(formatMoney(123456, "USD", null)).toBe(runtimeDefault);
  });
});
