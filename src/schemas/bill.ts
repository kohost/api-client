import defs, { ISODateString } from "./definitions";
import type { FromSchema } from "json-schema-to-ts";
import { mediaFileSchema } from "./mediaFile";

// One bill line is a discriminated union on `type`, so `lines.items` is their
// `oneOf`. The two branches are disjoint via the `type` const plus
// `additionalProperties: false`, so a line validates against exactly one.
//
// A cost line references a ticket cost entry by `(ticketId, costId)`. While the
// bill is a draft it carries only the reference, the picked `categoryId`, and
// any draft-time adjustment; the customer-facing `amount`, `description`, and
// `categoryName` are live-read from the cost entry and snapshotted onto the
// line at mark-sent. The billed amount is the marked-up actual (or the
// `adjustedAmount` override, floored at zero) — vendor truth on the cost entry
// is never touched.
const costLineSchema = {
  type: "object",
  additionalProperties: false,
  required: ["id", "type", "ticketId", "costId"],
  properties: {
    id: {
      type: "string",
      description: "Server-minted ID of the bill line.",
    },
    type: {
      type: "string",
      enum: ["cost"],
      description: "Discriminator: a line drawn from a ticket cost entry.",
    },
    ticketId: {
      type: "string",
      description: "The ID of the ticket the claimed cost entry lives on.",
    },
    costId: {
      type: "string",
      description: "The ID of the claimed cost entry within the ticket.",
    },
    categoryId: {
      type: ["string", "null"],
      default: null,
      description:
        "The picked billing category, inherited from the claimed cost entry " +
        "when the claim does not name one. Optional while drafting, required " +
        "at mark-sent. Manual pick — never derived from the ticket's issue.",
    },
    categoryName: {
      type: ["string", "null"],
      default: null,
      description:
        "The category name snapshotted at mark-sent. Null while drafting, " +
        "when it live-reads from the category library.",
    },
    adjustedAmount: {
      type: ["integer", "null"],
      minimum: 0,
      default: null,
      description:
        "Optional draft-time override of the billed amount in integer cents, " +
        "floored at zero, replacing the marked-up actual at display and " +
        "snapshot. Requires `adjustmentReason`. A credit (below zero) is a " +
        "manual line instead.",
    },
    adjustmentReason: {
      type: ["string", "null"],
      default: null,
      description:
        "Short required reason accompanying `adjustedAmount`, kept for the " +
        "internal record.",
    },
    amount: {
      type: ["integer", "null"],
      default: null,
      description:
        "The billed amount in integer cents, snapshotted at mark-sent. Null " +
        "while drafting, when it live-reads (marked-up actual or the " +
        "adjustment) from the cost entry.",
    },
    description: {
      type: ["string", "null"],
      default: null,
      description:
        "The line description, snapshotted at mark-sent. Null while drafting, " +
        "when it live-reads from the cost entry.",
    },
    taxable: {
      type: "boolean",
      default: false,
      description:
        "Whether the line's amount joins the bill's taxable subtotal. " +
        "Customer-facing: locks at mark-sent.",
    },
  },
} as const;

// A manual line is a literal customer-facing row with no markup math: a
// `description` and `amount` (which may be negative, serving as a credit) and
// an optional `propertyId`. The independent internal fields — informational
// `cost` (never derives the amount), `vendorId`, the vendor-invoice file, and
// `vendorInvoiceNumber` — are redacted org-side via `canSeeCostSplit` and stay
// editable in any bill state.
const manualLineSchema = {
  type: "object",
  additionalProperties: false,
  required: ["id", "type", "description", "amount"],
  properties: {
    id: {
      type: "string",
      description: "Server-minted ID of the bill line.",
    },
    type: {
      type: "string",
      enum: ["manual"],
      description: "Discriminator: a literal, non-ticket line.",
    },
    description: {
      type: "string",
      minLength: 1,
      description: "The literal customer-facing description.",
    },
    amount: {
      type: "integer",
      description:
        "The billed amount in integer cents. May be negative, serving as a " +
        "credit (reference the reason in the description).",
    },
    propertyId: {
      type: ["string", "null"],
      default: null,
      description:
        "The property the manual line is attributed to, when it concerns one.",
    },
    categoryId: {
      type: ["string", "null"],
      default: null,
      description:
        "The picked billing category. Optional while drafting, required at " +
        "mark-sent.",
    },
    categoryName: {
      type: ["string", "null"],
      default: null,
      description: "The category name snapshotted at mark-sent.",
    },
    cost: {
      type: ["integer", "null"],
      default: null,
      description:
        "Informational internal vendor cost in integer cents. Never derives " +
        "the amount. Redacted org-side.",
    },
    vendorId: {
      type: ["string", "null"],
      default: null,
      description:
        "Optional reference to the org-scoped Vendor. Internal, redacted " +
        "org-side.",
    },
    vendorInvoice: {
      anyOf: [{ $ref: "mediaFile.json" }, { type: "null" }],
      default: null,
      description:
        "The vendor's invoice file backing the line, mirroring the cost-entry " +
        "field. Internal, redacted org-side.",
    },
    vendorInvoiceNumber: {
      type: ["string", "null"],
      default: null,
      description:
        "The vendor's own invoice number. Internal, redacted org-side.",
    },
    taxable: {
      type: "boolean",
      default: false,
      description:
        "Whether the line's amount joins the bill's taxable subtotal. " +
        "Customer-facing: locks at mark-sent.",
    },
  },
} as const;

export const billSchema = {
  $schema: "http://json-schema.org/draft-07/schema",
  $id: "bill.json",
  title: "Bill",
  description:
    "A OneBill bill, stored platform-wide and stamped with its organization: " +
    "KFC staff assemble billed lines from the " +
    "uninvoiced cost pool (plus manual lines) into a draft, then mark it sent " +
    "to freeze and reveal it to the customer. Lifecycle draft → sent → paid, " +
    "plus void. Customers see a bill in-app only once sent.",
  type: "object",
  required: ["id", "organizationId", "status", "currency", "lines"],
  additionalProperties: false,
  properties: {
    id: {
      $ref: "definitions.json#/definitions/id",
    },
    type: {
      type: "string",
      enum: ["bill"],
      default: "bill",
    },
    organizationId: {
      type: "string",
      description:
        "The organization the bill invoices. Bills live in one admin-database " +
        "collection across every organization, so each carries its owner " +
        "explicitly — stamped from the request context at creation, never " +
        "client-supplied.",
    },
    status: {
      type: "string",
      enum: ["draft", "sent", "paid", "void"],
      default: "draft",
      description:
        "Lifecycle state. `sent` freezes customer-facing fields and reveals " +
        "the bill to the org; `paid` records manual payment; `void` releases " +
        "cost-entry claims and hides the bill from the org view. Drafts " +
        "hard-delete rather than voiding.",
    },
    invoiceNumber: {
      type: ["string", "null"],
      default: null,
      description:
        "Kohost's own invoice number, `KB-<n>` from a single global sequence. " +
        "System-assigned at mark-sent and never entered by hand: null while " +
        "the bill is a draft, immutable once set. A wrong bill is corrected " +
        "by void-and-reissue, so numbers gap and are never reused.",
    },
    period: {
      type: ["string", "null"],
      default: null,
      description:
        'Display-only month label (e.g. "July 2026"). A UI hint; the bill\'s ' +
        "membership is defined by its lines, not a calendar bucket.",
    },
    currency: {
      type: "string",
      enum: ["USD"],
      default: "USD",
      description: "ISO 4217 currency code. USD only in v1.",
    },
    fileId: {
      type: ["string", "null"],
      default: null,
      description:
        "The generated bill PDF's media-file ID, minted atomically at " +
        "mark-sent.",
    },
    fileUrl: {
      type: ["string", "null"],
      default: null,
      description:
        "The generated bill PDF's file-store URL, snapshotted at mark-sent " +
        "alongside fileId. Held so the sent-bill surface and the sent " +
        "notification email can mint a signed, unauthenticated download link " +
        "without a file lookup. Unsigned on its own (a bare link 401s).",
    },
    memo: {
      type: ["string", "null"],
      default: null,
      description:
        "Internal KFC-only note. Never customer-facing; editable in any state.",
    },
    billingAddress: {
      anyOf: [
        { $ref: "definitions.json#/definitions/address" },
        { type: "null" },
      ],
      default: null,
      description:
        "The org billing address snapshotted at mark-sent. Null while " +
        "drafting, when it live-reads from the Organization. Mark-sent " +
        "requires a complete address (line1, city, state, postalCode).",
    },
    taxRate: {
      type: ["number", "null"],
      default: null,
      minimum: 0,
      description:
        "Tax rate as a plain float percent applied to the taxable line " +
        "subtotal. While drafting, null means the platform default rate; the " +
        "effective rate is snapshotted at mark-sent.",
    },
    taxExempt: {
      type: "boolean",
      default: false,
      description:
        "The organization's tax exemption snapshotted at mark-sent. While " +
        "drafting it live-reads from the Organization.",
    },
    shippingAmount: {
      type: ["integer", "null"],
      default: null,
      minimum: 0,
      description:
        "Shipping & handling in integer cents, added to the grand total on " +
        "top of the line subtotal and tax. Null means none.",
    },
    lines: {
      type: "array",
      default: [],
      description:
        "The bill's lines: cost lines claimed from the uninvoiced pool and " +
        "literal manual lines.",
      items: {
        oneOf: [costLineSchema, manualLineSchema],
      },
    },
    sentAt: {
      $ref: "definitions.json#/definitions/date",
      description: "When the bill was marked sent. Absent until sent.",
    },
    paidAt: {
      $ref: "definitions.json#/definitions/date",
      description: "When the bill was marked paid. Absent until paid.",
    },
    voidedAt: {
      $ref: "definitions.json#/definitions/date",
      description: "When the bill was voided. Absent unless voided.",
    },
    createdAt: {
      $ref: "definitions.json#/definitions/date",
    },
    updatedAt: {
      $ref: "definitions.json#/definitions/date",
    },
  },
} as const;

export type BillSchema = FromSchema<
  typeof billSchema,
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

/** One line on a bill: a cost line or a manual line. */
export type BillLine = NonNullable<BillSchema["lines"]>[number];
