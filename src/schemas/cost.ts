import defs, { ISODateString } from "./definitions";
import type { FromSchema } from "json-schema-to-ts";
import { costEntryProperties, costEntryRequired } from "./costEntry";
import { mediaFileSchema } from "./mediaFile";

export const costSchema = {
  $schema: "http://json-schema.org/draft-07/schema",
  $id: "cost.json",
  title: "Cost",
  description:
    "A OneBill cost entry that no ticket carries: a recurring vendor charge, " +
    "an expense found while reconciling an invoice, a pass-through cost. It " +
    "shares the money shape and reconciliation lifecycle of a ticket cost " +
    "entry and moves through the uninvoiced pool the same way, but because no " +
    "ticket carries it the DNE approval gate never applies. Stored " +
    "platform-wide beside bills and stamped with its organization.",
  type: "object",
  required: [...costEntryRequired, "organizationId"],
  additionalProperties: false,
  properties: {
    ...costEntryProperties,
    type: {
      type: "string",
      enum: ["cost"],
      default: "cost",
    },
    source: {
      type: "string",
      enum: ["adhoc", "contract"],
      default: "adhoc",
      description:
        "How the entry came to be recorded: `adhoc` when a biller typed in a " +
        "charge, `contract` when a Service contract minted it for a line " +
        "period. A contract entry's price is fixed by the contract: it skips " +
        "the below-cost checks, and one priced at zero is never billed. A " +
        "ticket cost entry carries no source: living on the ticket is what " +
        "says where it came from.",
    },
    serviceContractId: {
      type: ["string", "null"],
      default: null,
      description:
        "The Service contract that minted the entry. Set once at mint and " +
        "never edited; null on an ad hoc cost.",
    },
    splitId: {
      type: ["string", "null"],
      default: null,
      description:
        "The customer split the entry was minted for. Set once at mint.",
    },
    periodStart: {
      anyOf: [{ $ref: "definitions.json#/definitions/date" }, { type: "null" }],
      default: null,
      description:
        "The first day (UTC) of the line period the entry was minted for. " +
        "With the contract and split it is the slot a line occupies, so a " +
        "line is never minted twice.",
    },
    customerPeriodStarts: {
      type: "array",
      default: [],
      items: { $ref: "definitions.json#/definitions/date" },
      description:
        "The first day (UTC) of each customer period whose price landed on " +
        "this line: none or one. Empty on an ad hoc cost.",
    },
    vendorPeriodStarts: {
      type: "array",
      default: [],
      items: { $ref: "definitions.json#/definitions/date" },
      description:
        "The first day (UTC) of each vendor period whose invoice day falls " +
        "in this line, so its vendor amount landed here. Empty on an ad hoc " +
        "cost and on a line whose vendor side is a settled zero.",
    },
    organizationId: {
      type: "string",
      description:
        "The organization the cost is billed to. These entries live in one " +
        "admin-database collection across every organization, so each " +
        "carries its owner explicitly — stamped from the request context at " +
        "creation, never client-supplied.",
    },
    propertyId: {
      type: ["string", "null"],
      default: null,
      description:
        "The property the cost is attributed to, when it concerns one.",
    },
    createdBy: {
      type: ["string", "null"],
      default: null,
      description:
        "The ID of the billing staff member who recorded the entry. Null " +
        "when the write was not user-attributable.",
    },
    createdAt: {
      $ref: "definitions.json#/definitions/date",
    },
    updatedAt: {
      $ref: "definitions.json#/definitions/date",
    },
  },
} as const;

export type CostSchema = FromSchema<
  typeof costSchema,
  {
    references: [typeof defs, typeof mediaFileSchema];
    deserialize: [
      {
        pattern: {
          format: "date-time";
        };
        output: Date | ISODateString;
      },
    ];
  }
>;

/** One entry of a cost's append-only billing review history. */
export type CostBillingReviewEntry = NonNullable<
  CostSchema["billingReview"]
>[number];
