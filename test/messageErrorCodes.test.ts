import { describe, it, expect } from "vitest";
import {
  categoryForMessageErrorCode,
  isMessageErrorCategory,
  MESSAGE_ERROR_CATEGORIES,
} from "../src/lib/messageErrorCodes.js";
import { deliveryOutcomeForStatus } from "../src/lib/deliveryStatus.js";

describe("categoryForMessageErrorCode", () => {
  it("maps the locked Twilio codes to their categories", () => {
    expect(categoryForMessageErrorCode("21610")).toBe("optedOut");
    expect(categoryForMessageErrorCode("30007")).toBe("carrierFiltered");
    expect(categoryForMessageErrorCode("30023")).toBe("rateCapped");
    expect(categoryForMessageErrorCode("30027")).toBe("rateCapped");
  });

  it("trims surrounding whitespace before matching", () => {
    expect(categoryForMessageErrorCode(" 21610 ")).toBe("optedOut");
  });

  it("returns null for unmapped, empty, or nullish codes", () => {
    expect(categoryForMessageErrorCode("99999")).toBeNull();
    expect(categoryForMessageErrorCode("")).toBeNull();
    expect(categoryForMessageErrorCode(null)).toBeNull();
    expect(categoryForMessageErrorCode(undefined)).toBeNull();
  });

  it("exposes expired as a category even though no code maps to it yet", () => {
    expect(MESSAGE_ERROR_CATEGORIES).toContain("expired");
    expect(isMessageErrorCategory("expired")).toBe(true);
    expect(isMessageErrorCategory("nope")).toBe(false);
  });
});

describe("deliveryOutcomeForStatus", () => {
  it("buckets in-flight statuses as sent", () => {
    for (const status of ["queued", "accepted", "sending", "sent", "deferred"]) {
      expect(deliveryOutcomeForStatus(status)).toBe("sent");
    }
  });

  it("buckets terminal success (incl. read/open/click) as delivered", () => {
    for (const status of ["delivered", "read", "opened", "clicked"]) {
      expect(deliveryOutcomeForStatus(status)).toBe("delivered");
    }
  });

  it("buckets post-delivery unsubscribe/spam-report as delivered", () => {
    for (const status of ["unsubscribed", "spamReport"]) {
      expect(deliveryOutcomeForStatus(status)).toBe("delivered");
    }
  });

  it("buckets terminal failures as failed", () => {
    for (const status of ["failed", "undelivered", "bounced", "blocked"]) {
      expect(deliveryOutcomeForStatus(status)).toBe("failed");
    }
  });

  it("returns null for inbound and unmapped statuses", () => {
    expect(deliveryOutcomeForStatus("received")).toBeNull();
    expect(deliveryOutcomeForStatus("receiving")).toBeNull();
    expect(deliveryOutcomeForStatus(undefined)).toBeNull();
  });
});
