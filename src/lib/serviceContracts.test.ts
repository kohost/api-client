import { describe, expect, it } from "vitest";

import {
  ENDING_SOON_DAYS,
  daysUntilEnd,
  isEndingSoon,
  isExpired,
} from "./serviceContracts.js";

const TODAY = new Date("2026-09-19T15:00:00.000Z");

const contract = (status: string, endsAt: string | null) => ({
  status,
  endsAt,
});

describe("daysUntilEnd", () => {
  it("counts whole days regardless of the time of day", () => {
    expect(daysUntilEnd("2026-10-19", TODAY)).toBe(30);
    expect(daysUntilEnd("2026-09-19T00:00:00.000Z", TODAY)).toBe(0);
  });

  it("goes negative once the end date has passed", () => {
    expect(daysUntilEnd("2026-09-17", TODAY)).toBe(-2);
  });

  it("has nothing to count on an open-ended contract", () => {
    expect(daysUntilEnd(null, TODAY)).toBeNull();
  });
});

describe("isEndingSoon", () => {
  it(`flags an active contract ending within ${ENDING_SOON_DAYS} days`, () => {
    expect(isEndingSoon(contract("active", "2026-10-19"), TODAY)).toBe(true);
    expect(isEndingSoon(contract("active", "2026-09-19"), TODAY)).toBe(true);
  });

  it("leaves a contract ending later alone", () => {
    expect(isEndingSoon(contract("active", "2026-10-20"), TODAY)).toBe(false);
  });

  it("never flags an open-ended or inactive contract", () => {
    expect(isEndingSoon(contract("active", null), TODAY)).toBe(false);
    expect(isEndingSoon(contract("draft", "2026-09-25"), TODAY)).toBe(false);
    expect(isEndingSoon(contract("ended", "2026-09-25"), TODAY)).toBe(false);
  });

  it("stops flagging once the end date has passed", () => {
    expect(isEndingSoon(contract("active", "2026-09-18"), TODAY)).toBe(false);
  });
});

describe("isExpired", () => {
  it("is an active contract past its last day", () => {
    expect(isExpired(contract("active", "2026-09-18"), TODAY)).toBe(true);
  });

  it("still runs through its last day", () => {
    expect(isExpired(contract("active", "2026-09-19"), TODAY)).toBe(false);
  });

  it("is never an open-ended or finished contract", () => {
    expect(isExpired(contract("active", null), TODAY)).toBe(false);
    expect(isExpired(contract("ended", "2026-09-18"), TODAY)).toBe(false);
  });
});
