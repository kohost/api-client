// The cost-entry core: the money shape and reconciliation lifecycle every
// OneBill cost carries, whether a Ticket embeds it or it stands alone in the
// costs collection. Both hosts spread these consts into their own `properties`
// and `required` rather than `$ref`-ing this file: draft-07 resolves `allOf`
// against `additionalProperties: false` per subschema, so a composed entry
// would reject every field the other half declared, and `FromSchema` derives
// nothing useful from a reference it cannot inline.
//
// Nothing here is exported with a name ending in "Schema" and the model
// generator skips this file by name (`scripts/generate-source-models.js`):
// these are fragments, not an entity.

const money = (description: string) =>
  ({
    type: "object",
    additionalProperties: false,
    required: ["amount", "recordedBy", "recordedAt"],
    description,
    properties: {
      amount: {
        type: "integer",
        minimum: 0,
        description: "The amount in integer cents.",
      },
      recordedBy: {
        type: "string",
        description: "The ID of the user who recorded the amount.",
      },
      recordedAt: {
        $ref: "definitions.json#/definitions/date",
        description: "When the amount was recorded.",
      },
    },
  }) as const;

/**
 * The append-only billing review history, over whichever actions the host
 * admits. A ticket cost can be voided (withdrawn from the customer); a
 * standalone cost has no ticket to withdraw it from, so its history stops at
 * write-offs and divergence acknowledgements.
 */
export const costBillingReview = <const Actions extends readonly string[]>(
  actions: Actions,
) =>
  ({
    type: "array",
    default: [],
    description:
      "Append-only billing review history for the entry (approval-history " +
      "pattern): reversible write-offs, and billed-vs-price divergence " +
      "acknowledgements. Internal, redacted org-side.",
    items: {
      type: "object",
      additionalProperties: false,
      required: ["id", "action", "performedAt"],
      properties: {
        id: {
          type: "string",
          description: "The ID of the billing review entry.",
        },
        action: {
          type: "string",
          enum: actions,
        },
        performedBy: {
          type: ["string", "null"],
          default: null,
          description:
            "The ID of the user whose write appended this entry. Null when " +
            "the write was not user-attributable.",
        },
        performedAt: {
          $ref: "definitions.json#/definitions/date",
          description: "When the entry was appended.",
        },
        note: {
          type: ["string", "null"],
          default: null,
          description: "Free-text rationale for the action.",
        },
        billedAmount: {
          type: "integer",
          minimum: 0,
          description:
            "divergenceAcknowledged only: the amount a bill line already " +
            "charged for this entry, in integer cents, frozen at ack time.",
        },
        priceAmount: {
          type: "integer",
          minimum: 0,
          description:
            "divergenceAcknowledged only: the entry's stored customer price " +
            "in integer cents at ack time. A divergence is a billed line " +
            "that no longer matches the price behind it — a price corrected " +
            "after the cost was claimed — so the ack silences this one pair " +
            "and any later price move re-flags it. A vendor actual arriving " +
            "after billing is not a divergence: it moves margin, not what " +
            "the customer owes.",
        },
      },
    },
  }) as const;

export const costEntryRequired = [
  "id",
  "description",
  "currency",
  "price",
  "estimate",
  "markup",
] as const;

export const costEntryProperties = {
  id: {
    type: "string",
    description: "The ID of the cost entry.",
  },
  description: {
    type: "string",
    description: "What the cost covers.",
  },
  currency: {
    type: "string",
    default: "USD",
    description: "ISO 4217 currency code of the entry's amounts.",
  },
  price: money(
    "The authoritative customer price — what the org is charged, what the " +
      "approval gate totals, and what a bill line bills. Seeded at recording " +
      "from the estimate and the markup, and from then on independent of all " +
      "three: editing `estimate`, `actual`, or `markup` never moves it. Only " +
      "an explicit price write does.",
  ),
  estimate: money("The vendor cost estimate phase of the entry."),
  actual: money(
    "The settled vendor cost, recorded once the vendor's figure is known.",
  ),
  markup: {
    type: "object",
    additionalProperties: false,
    required: ["percent"],
    properties: {
      percent: {
        type: "number",
        description:
          "Markup percent the price was derived at, uncapped in either " +
          "direction. Context for how the price was arrived at, not the " +
          "source of truth for any amount: `price` is stored, so re-keying " +
          "this percent prices nothing. A biller may charge under the vendor " +
          "cost as a deliberate comp, and this records that as the negative " +
          "percent it is rather than as a floor of zero the price never came " +
          "from.",
      },
      custom: {
        type: "boolean",
        default: false,
        description:
          "Whether the percent was overridden by hand rather than keyed from " +
          "the configured markup tiers. Custom percents are never re-keyed on " +
          "estimate edits.",
      },
    },
  },
  vendorId: {
    type: ["string", "null"],
    default: null,
    description:
      "The Vendor the charge is owed to. A plain reference — no rollups — " +
      "resolved inside the entry's own organization. Internal, redacted " +
      "org-side with the rest of the cost split.",
  },
  categoryId: {
    type: ["string", "null"],
    default: null,
    description:
      "The billing category classifying this cost. `AddBillLine` snapshots " +
      "it onto the claiming line, which owns its own category from then on. " +
      "Internal, redacted org-side with the rest of the cost split.",
  },
  vendorInvoices: {
    type: "array",
    items: { $ref: "mediaFile.json" },
    default: [],
    description:
      "The vendor's paperwork backing the entry's amounts — an invoice plus " +
      "whatever came with it. Internal: the file-store cannot enforce " +
      "roster-only reads, so the boundary is this field living on the full " +
      "shape only, and the redacted projection never carries it.",
  },
  vendorInvoiceNumber: {
    type: ["string", "null"],
    default: null,
    description:
      "The vendor's own invoice number. Internal, redacted org-side like the " +
      "rest of the cost split.",
  },
  billId: {
    type: ["string", "null"],
    default: null,
    description:
      "Backlink to the bill whose draft claimed this cost as a line. Written " +
      "when a draft bill adds the line, cleared on line removal, draft " +
      "delete, or bill void; a claimed cost leaves the uninvoiced pool, " +
      "making double-invoicing structurally impossible. Server-maintained at " +
      "the repository, never set by clients.",
  },
  writtenOff: {
    type: "boolean",
    default: false,
    description:
      "Server-maintained denormalization of billingReview (approvalState " +
      "pattern): true after a writtenOff entry until a reinstated entry " +
      "follows. A written-off cost leaves the uninvoiced pool. Never set by " +
      "clients.",
  },
  billingReview: costBillingReview([
    "writtenOff",
    "reinstated",
    "divergenceAcknowledged",
  ]),
} as const;
