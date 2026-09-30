import defs, { ISODateString } from "./definitions";
import type { FromSchema } from "json-schema-to-ts";
import { mediaFileSchema } from "./mediaFile";

const splitItem = {
  type: "object",
  additionalProperties: false,
  required: ["id", "propertyId", "amount"],
  properties: {
    id: {
      type: "string",
    },
    propertyId: {
      type: ["string", "null"],
      description: "Null on an org-wide split.",
    },
    label: {
      type: ["string", "null"],
      default: null,
    },
    amount: {
      type: "integer",
      minimum: 0,
      description:
        "This split's share of the customer stream's per-period total, in " +
        "integer cents. The splits must add up to the total to activate.",
    },
    categoryId: {
      type: ["string", "null"],
      default: null,
      description:
        "The billing category the split's Contract costs arrive under.",
    },
    vendorAmount: {
      type: ["integer", "null"],
      minimum: 0,
      default: null,
      description:
        "This split's share of the vendor stream's per-period total, in " +
        "integer cents. Null with no vendor stream. With one, the splits' " +
        "vendor amounts must add up to its total to activate.",
    },
  },
} as const;

const streamRequired = ["amount", "cadence", "startsAt"] as const;

const streamProperties = {
  amount: {
    type: "integer",
    minimum: 0,
    description: "The per-period total, in integer cents.",
  },
  cadence: {
    type: "object",
    additionalProperties: false,
    required: ["months"],
    properties: {
      months: {
        type: "integer",
        enum: [1, 3, 6, 12],
        description: "Length of one period in whole months.",
      },
    },
  },
  startsAt: {
    $ref: "definitions.json#/definitions/date",
    description:
      "The first period's start: any day inside the term. Later periods " +
      "start on the same day of the month, clamped to a shorter month's " +
      "last day.",
  },
  nextPeriodStartsAt: {
    anyOf: [{ $ref: "definitions.json#/definitions/date" }, { type: "null" }],
    default: null,
    description:
      "The start of the stream's next period still to mint. Null until " +
      "activation. Only the line stream's is a schedule: the stream with " +
      "the shorter cadence, or the customer stream on a tie or with no " +
      "vendor stream. The other stream's periods mint with the line period " +
      "they land on.",
  },
} as const;

const stream = (description: string) =>
  ({
    type: "object",
    additionalProperties: false,
    required: streamRequired,
    description,
  }) as const;

export const serviceContractSchema = {
  $schema: "http://json-schema.org/draft-07/schema",
  $id: "serviceContract.json",
  title: "Service Contract",
  description:
    "Kohost's record of a recurring vendor service sold to an organization. " +
    "One term bounds two money streams, customer and vendor, each with its " +
    "own total, cadence and start, and any number of Ticket schedules. The " +
    "customer stream splits its total across properties; each split also " +
    "carries its share of the vendor total. Stored platform-wide beside " +
    "bills and costs and stamped with its organization (ADR 0043, ADR 0044).",
  type: "object",
  required: [
    "id",
    "type",
    "organizationId",
    "name",
    "startsAt",
    "customer",
    "status",
  ],
  additionalProperties: false,
  properties: {
    id: {
      $ref: "definitions.json#/definitions/id",
    },
    type: {
      type: "string",
      enum: ["serviceContract"],
      default: "serviceContract",
    },
    organizationId: {
      type: "string",
      description:
        "The organization the contract bills. Stamped from the request " +
        "context at creation, never client-supplied.",
    },
    name: {
      type: "string",
      minLength: 1,
    },
    reference: {
      type: ["string", "null"],
      default: null,
      description: "The vendor's own contract number.",
    },
    description: {
      type: "string",
      default: "",
      description:
        "Leads every minted entry's description, ahead of the split label " +
        "and the period label.",
    },
    startsAt: {
      $ref: "definitions.json#/definitions/date",
    },
    endsAt: {
      anyOf: [{ $ref: "definitions.json#/definitions/date" }, { type: "null" }],
      default: null,
      description: "Null on an open-ended contract.",
    },
    customer: {
      ...stream(
        "What the organization pays. Each line period mints one Contract " +
          "cost per split into the uninvoiced pool, carrying this stream's " +
          "split amount when a customer period starts in it.",
      ),
      required: [...streamRequired, "splits"],
      properties: {
        ...streamProperties,
        splits: {
          type: "array",
          default: [],
          items: splitItem,
        },
      },
    },
    vendor: {
      anyOf: [
        {
          ...stream(
            "What the vendor bills Kohost. Each period's amount lands whole " +
              "on the line period containing its invoice day, as each " +
              "customer split's vendor amount on that split's Contract cost.",
          ),
          required: [...streamRequired, "vendorId"],
          properties: {
            ...streamProperties,
            vendorId: {
              type: ["string", "null"],
              default: null,
              description: "Required to activate.",
            },
            invoicing: {
              type: "string",
              enum: ["advance", "arrears"],
              default: "arrears",
              description:
                "When the vendor invoices a period: on its first day " +
                "(`advance`) or the day after it ends (`arrears`). That day " +
                "decides which line period the vendor amount lands on. " +
                "Absent on a contract stored before it existed, which reads " +
                "as `arrears`.",
            },
          },
        },
        { type: "null" },
      ],
      default: null,
      description: "Null on a contract with no vendor stream.",
    },
    approval: {
      type: ["object", "null"],
      default: null,
      additionalProperties: false,
      description:
        "The organization's written approval of the recurring charge.",
      properties: {
        file: {
          anyOf: [{ $ref: "mediaFile.json" }, { type: "null" }],
        },
        approvedBy: {
          type: ["object", "null"],
          additionalProperties: false,
          required: ["name"],
          properties: {
            name: { type: "string" },
            title: { type: ["string", "null"] },
          },
        },
        approvedAt: {
          anyOf: [
            { $ref: "definitions.json#/definitions/date" },
            { type: "null" },
          ],
        },
      },
    },
    documents: {
      type: "array",
      items: { $ref: "mediaFile.json" },
      default: [],
    },
    ticketSchedules: {
      type: "array",
      default: [],
      items: {
        type: "object",
        additionalProperties: false,
        required: ["automationId"],
        properties: {
          automationId: { type: "string" },
        },
      },
    },
    status: {
      type: "string",
      enum: ["draft", "active", "ended", "cancelled"],
      default: "draft",
    },
    cancelledReason: {
      type: ["string", "null"],
      default: null,
    },
    createdBy: {
      type: ["string", "null"],
      default: null,
    },
    createdAt: {
      $ref: "definitions.json#/definitions/date",
    },
    updatedAt: {
      $ref: "definitions.json#/definitions/date",
    },
  },
} as const;

export type ServiceContractSchema = FromSchema<
  typeof serviceContractSchema,
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

export type ServiceContractCustomerStream = ServiceContractSchema["customer"];
export type ServiceContractVendorStream = NonNullable<
  ServiceContractSchema["vendor"]
>;
export type ServiceContractSplit =
  ServiceContractCustomerStream["splits"][number];
