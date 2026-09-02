import { Ajv } from "ajv";
import addFormats from "ajv-formats";
import { describe, expect, it } from "vitest";

import { costSchema } from "./cost";
import defs from "./definitions";
import { mediaFileSchema } from "./mediaFile";

// Mirrors the AJV configuration the model generator compiles validators with
// (scripts/generate-source-models.js), so these assertions exercise the same
// rules a `Cost` model runs in `Entity`.
function compileCostValidator() {
  const ajv = new Ajv({
    allErrors: true,
    useDefaults: true,
    strict: false,
    allowMatchingProperties: true,
    allowUnionTypes: true,
    strictRequired: false,
    discriminator: true,
    schemas: [defs, mediaFileSchema, costSchema],
  });
  addFormats(ajv);
  return ajv.compile({ $ref: "cost.json" });
}

const cost = {
  id: "cst_1",
  type: "cost",
  source: "adhoc",
  organizationId: "org_1",
  description: "Monthly filter delivery",
  currency: "USD",
  price: {
    amount: 12000,
    recordedBy: "usr_1",
    recordedAt: "2026-07-21T00:00:00.000Z",
  },
  estimate: {
    amount: 10000,
    recordedBy: "usr_1",
    recordedAt: "2026-07-21T00:00:00.000Z",
  },
  markup: { percent: 20, custom: false },
};

describe("cost document", () => {
  it("accepts an entry recorded by a biller", () => {
    expect(compileCostValidator()(cost)).toBe(true);
  });

  it("stamps the source when the write leaves it out", () => {
    const validate = compileCostValidator();
    const { source, ...withoutSource } = cost;
    void source;
    const doc: Record<string, unknown> = { ...withoutSource };
    expect(validate(doc)).toBe(true);
    expect(doc.source).toBe("adhoc");
  });

  it("requires the organization the entry is billed to", () => {
    const validate = compileCostValidator();
    const { organizationId, ...unstamped } = cost;
    void organizationId;
    expect(validate(unstamped)).toBe(false);
  });

  it("accepts a below-cost price and the negative markup behind it", () => {
    const validate = compileCostValidator();
    const comped = {
      ...cost,
      price: { ...cost.price, amount: 8000 },
      markup: { percent: -20, custom: true },
    };
    expect(validate(comped)).toBe(true);
  });

  // Voiding withdraws a cost from the ticket that carries it. Nothing carries
  // this one, so the action has no meaning here.
  it("rejects a voided billing review entry", () => {
    const validate = compileCostValidator();
    const voided = {
      ...cost,
      billingReview: [
        {
          id: "rev_1",
          action: "voided",
          performedAt: "2026-07-22T00:00:00.000Z",
        },
      ],
    };
    expect(validate(voided)).toBe(false);
  });

  it("accepts a write-off and its reinstatement", () => {
    const validate = compileCostValidator();
    const reviewed = {
      ...cost,
      writtenOff: false,
      billingReview: [
        {
          id: "rev_1",
          action: "writtenOff",
          performedAt: "2026-07-22T00:00:00.000Z",
          note: "Absorbed",
        },
        {
          id: "rev_2",
          action: "reinstated",
          performedAt: "2026-07-23T00:00:00.000Z",
        },
      ],
    };
    expect(validate(reviewed)).toBe(true);
  });

  // Living on a ticket is what says a cost came from one; a stored entry that
  // claimed both would be two answers to the same question.
  it("rejects the ticket-only fields", () => {
    const validate = compileCostValidator();
    expect(validate({ ...cost, workItemId: "wrk_1" })).toBe(false);
    expect(validate({ ...cost, voided: true })).toBe(false);
  });
});
