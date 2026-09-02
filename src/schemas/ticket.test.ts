import { Ajv } from "ajv";
import addFormats from "ajv-formats";
import { describe, expect, it } from "vitest";

import defs from "./definitions";
import { mediaFileSchema } from "./mediaFile";
import { ticketSchema } from "./ticket";

// Mirrors the AJV configuration the model generator compiles validators with
// (scripts/generate-source-models.js), so these assertions exercise the same
// rules a `Ticket` model runs in `Entity`. Each validator targets a single
// array element via a JSON-pointer $ref into the registered ticket schema, so
// entry shapes can be checked without assembling a whole valid ticket.
function compileEntryValidator(pointer: string) {
  const ajv = new Ajv({
    allErrors: true,
    useDefaults: true,
    strict: false,
    allowMatchingProperties: true,
    allowUnionTypes: true,
    strictRequired: false,
    discriminator: true,
    schemas: [defs, mediaFileSchema, ticketSchema],
  });
  addFormats(ajv);
  return ajv.compile({ $ref: pointer });
}

const compileCostEntryValidator = () =>
  compileEntryValidator("ticket.json#/properties/costs/items");

const compileWorkItemValidator = () =>
  compileEntryValidator("ticket.json#/properties/work/items");

const fullCostEntry = {
  id: "cost_1",
  description: "HVAC part",
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

const redactedCostEntry = {
  id: "cost_1",
  description: "HVAC part",
  currency: "USD",
  price: 12000,
};

describe("ticket cost entry wire shapes", () => {
  it("accepts the full vendor cost shape a roster viewer receives", () => {
    const validate = compileCostEntryValidator();
    expect(validate(fullCostEntry)).toBe(true);
  });

  it("accepts the full shape with a recorded actual", () => {
    const validate = compileCostEntryValidator();
    const withActual = {
      ...fullCostEntry,
      actual: {
        amount: 9500,
        recordedBy: "usr_1",
        recordedAt: "2026-07-21T00:00:00.000Z",
      },
    };
    expect(validate(withActual)).toBe(true);
  });

  it("accepts the redacted price-only shape an org-side viewer receives", () => {
    const validate = compileCostEntryValidator();
    expect(validate(redactedCostEntry)).toBe(true);
  });

  it("rejects a full shape missing the stored price", () => {
    const validate = compileCostEntryValidator();
    const { price, ...withoutPrice } = fullCostEntry;
    void price;
    expect(validate(withoutPrice)).toBe(false);
  });

  it("keeps the stored price independent of the estimate and the markup", () => {
    const validate = compileCostEntryValidator();
    const corrected = {
      ...fullCostEntry,
      price: { ...fullCostEntry.price, amount: 20000 },
    };
    expect(validate(corrected)).toBe(true);
  });

  // A biller may charge under what the vendor billed as a deliberate comp,
  // and the percent behind that price is negative. A floor of zero here would
  // force the entry to claim a markup it never had.
  it("accepts a below-cost price and the negative markup behind it", () => {
    const validate = compileCostEntryValidator();
    const comped = {
      ...fullCostEntry,
      price: { ...fullCostEntry.price, amount: 8000 },
      markup: { percent: -20, custom: true },
    };
    expect(validate(comped)).toBe(true);
  });

  it("accepts the full shape carrying vendor and work item references", () => {
    const validate = compileCostEntryValidator();
    const withReferences = {
      ...fullCostEntry,
      vendorId: "vnd_1",
      workItemId: "wrk_1",
    };
    expect(validate(withReferences)).toBe(true);
  });

  it("rejects a redacted entry carrying either reference", () => {
    const validate = compileCostEntryValidator();
    expect(validate({ ...redactedCostEntry, vendorId: "vnd_1" })).toBe(false);
    expect(validate({ ...redactedCostEntry, workItemId: "wrk_1" })).toBe(false);
  });

  it("rejects an entry that mixes vendor and redacted fields", () => {
    const validate = compileCostEntryValidator();
    expect(validate({ ...redactedCostEntry, markup: { percent: 20 } })).toBe(
      false,
    );
    expect(validate({ ...fullCostEntry, price: 12000 })).toBe(false);
  });

  it("rejects an entry carrying neither vendor estimate nor price", () => {
    const validate = compileCostEntryValidator();
    expect(
      validate({ id: "cost_1", description: "HVAC part", currency: "USD" }),
    ).toBe(false);
  });
});

const workItem = {
  id: "wrk_1",
  performer: { id: "vnd_1", discriminator: "vendor", name: "Ace Plumbing" },
  date: "2026-07-31",
  time: "10:00",
  scheduledBy: "usr_1",
  scheduledAt: "2026-07-24T14:02:11.000Z",
};

describe("ticket work item wire shape", () => {
  it("accepts a timed vendor booking", () => {
    expect(compileWorkItemValidator()(workItem)).toBe(true);
  });

  it("accepts a day-only booking, with the time absent or null", () => {
    const validate = compileWorkItemValidator();
    const { time, ...dayOnly } = workItem;
    void time;
    expect(validate(dayOnly)).toBe(true);
    expect(validate({ ...workItem, time: null })).toBe(true);
  });

  it("admits a user performer so staff can perform work without a migration", () => {
    const validate = compileWorkItemValidator();
    expect(
      validate({
        ...workItem,
        performer: { id: "usr_2", discriminator: "user", name: "Sam Diaz" },
      }),
    ).toBe(true);
  });

  it("requires a performer and a date", () => {
    const validate = compileWorkItemValidator();
    const { date, ...withoutDate } = workItem;
    void date;
    expect(validate(withoutDate)).toBe(false);
    const { performer, ...withoutPerformer } = workItem;
    void performer;
    expect(validate(withoutPerformer)).toBe(false);
  });

  it("rejects a date that is not wall-clock YYYY-MM-DD", () => {
    const validate = compileWorkItemValidator();
    expect(validate({ ...workItem, date: "07/31/2026" })).toBe(false);
    expect(validate({ ...workItem, date: "2026-07-31T00:00:00.000Z" })).toBe(
      false,
    );
  });

  it("rejects a time that is not 24-hour HH:mm", () => {
    const validate = compileWorkItemValidator();
    expect(validate({ ...workItem, time: "10:00AM" })).toBe(false);
    expect(validate({ ...workItem, time: "24:00" })).toBe(false);
  });

  it("rejects a lifecycle status — the conversation log is the history", () => {
    const validate = compileWorkItemValidator();
    expect(validate({ ...workItem, status: "completed" })).toBe(false);
  });
});
