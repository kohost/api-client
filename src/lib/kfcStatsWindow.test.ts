import { describe, expect, it } from "vitest";

import {
  KFC_STATS_DEFAULT_WINDOW_DAYS,
  KFC_STATS_MAX_RANGE_DAYS,
  KFC_STATS_TIMEZONE,
  resolveKfcStatsWindowBounds,
} from "./kfcStatsWindow.js";

describe("KFC stats window constants", () => {
  // These are the values both the API's resolveKfcStatsRange and the app's
  // resolveRange used to copy by hand; pin them so a change to the contract is
  // a deliberate, single edit rather than a silent divergence.
  it("pins the anchor zone, default window, and max span", () => {
    expect(KFC_STATS_TIMEZONE).toBe("America/Los_Angeles");
    expect(KFC_STATS_DEFAULT_WINDOW_DAYS).toBe(30);
    expect(KFC_STATS_MAX_RANGE_DAYS).toBe(366);
  });
});

describe("resolveKfcStatsWindowBounds", () => {
  const TODAY = "2026-07-21";

  it("defaults an empty window to the last 30 days inclusive of today", () => {
    expect(resolveKfcStatsWindowBounds({}, TODAY)).toEqual({
      from: "2026-06-22",
      to: "2026-07-21",
    });
  });

  it("keeps explicit bounds untouched", () => {
    const window = { from: "2026-01-05", to: "2026-01-09" };
    expect(resolveKfcStatsWindowBounds(window, TODAY)).toEqual(window);
  });

  it("fills a missing from as the 29 days before an explicit to", () => {
    expect(resolveKfcStatsWindowBounds({ to: "2026-03-31" }, TODAY)).toEqual({
      from: "2026-03-02",
      to: "2026-03-31",
    });
  });

  it("ends at today when only from is given", () => {
    expect(resolveKfcStatsWindowBounds({ from: "2026-07-01" }, TODAY)).toEqual({
      from: "2026-07-01",
      to: "2026-07-21",
    });
  });

  it("treats null like a missing bound", () => {
    expect(
      resolveKfcStatsWindowBounds({ from: null, to: null }, TODAY),
    ).toEqual({ from: "2026-06-22", to: "2026-07-21" });
  });

  it("shifts across a month boundary without drifting", () => {
    expect(resolveKfcStatsWindowBounds({ to: "2026-01-10" }, TODAY)).toEqual({
      from: "2025-12-12",
      to: "2026-01-10",
    });
  });

  it("does not drift the fallback across a spring DST boundary", () => {
    // 2026 PST→PDT is Mar 8; the 29-day shback lands on Feb 8 regardless.
    expect(resolveKfcStatsWindowBounds({ to: "2026-03-09" }, TODAY)).toEqual({
      from: "2026-02-08",
      to: "2026-03-09",
    });
  });
});
