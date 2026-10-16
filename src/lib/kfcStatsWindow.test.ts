import { describe, expect, it } from "vitest";

import { resolveKfcStatsWindowBounds } from "./kfcStatsWindow.js";

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

  it("does not drift the fallback across a spring DST boundary", () => {
    // 2026 PST→PDT is Mar 8; the 29-day shback lands on Feb 8 regardless.
    expect(resolveKfcStatsWindowBounds({ to: "2026-03-09" }, TODAY)).toEqual({
      from: "2026-02-08",
      to: "2026-03-09",
    });
  });
});
