import defs, { ISODateString } from "./definitions";
import type { FromSchema } from "json-schema-to-ts";
import {
  costBillingReview,
  costEntryProperties,
  costEntryRequired,
} from "./costEntry";
import type { mediaFileSchema } from "./mediaFile";

// Rich-text node vocabulary for parsedBody.content (ADR 0012). Deliberately
// fixed-depth rather than recursive: json-schema-to-ts cannot derive types
// from self-referencing schemas, so nested lists are excluded. These consts
// must not be exported — the model generator treats the first export ending
// in "Schema" as the entity schema.
const richTextTextNode = {
  type: "object",
  additionalProperties: false,
  required: ["type", "text"],
  properties: {
    type: { type: "string", enum: ["text"] },
    text: { type: "string" },
    marks: {
      type: "array",
      uniqueItems: true,
      items: { type: "string", enum: ["bold", "italic", "underline"] },
    },
  },
} as const;

const richTextMentionNode = {
  type: "object",
  additionalProperties: false,
  required: ["type", "id", "discriminator", "label"],
  properties: {
    type: { type: "string", enum: ["mention"] },
    id: { type: "string" },
    discriminator: { type: "string", enum: ["user", "vendor", "system"] },
    label: {
      type: "string",
      description:
        "Display name of the mentioned entity, without the leading @.",
    },
  },
} as const;

const richTextHardBreakNode = {
  type: "object",
  additionalProperties: false,
  required: ["type"],
  properties: {
    type: { type: "string", enum: ["hardBreak"] },
  },
} as const;

const richTextInlineNodes = {
  type: "array",
  minItems: 1,
  items: {
    anyOf: [richTextTextNode, richTextMentionNode, richTextHardBreakNode],
  },
} as const;

const richTextParagraphNode = {
  type: "object",
  additionalProperties: false,
  required: ["type", "content"],
  properties: {
    type: { type: "string", enum: ["paragraph"] },
    content: richTextInlineNodes,
  },
} as const;

const richTextListItemNode = {
  type: "object",
  additionalProperties: false,
  required: ["type", "content"],
  properties: {
    type: { type: "string", enum: ["listItem"] },
    content: richTextInlineNodes,
  },
} as const;

const richTextBulletListNode = {
  type: "object",
  additionalProperties: false,
  required: ["type", "content"],
  properties: {
    type: { type: "string", enum: ["bulletList"] },
    content: { type: "array", minItems: 1, items: richTextListItemNode },
  },
} as const;

const richTextOrderedListNode = {
  type: "object",
  additionalProperties: false,
  required: ["type", "content"],
  properties: {
    type: { type: "string", enum: ["orderedList"] },
    content: { type: "array", minItems: 1, items: richTextListItemNode },
  },
} as const;

// A cost entry reaches a client in one of two shapes, and both are valid wire
// payloads a `Ticket` model must accept. A roster viewer or superadmin receives
// the stored entry (`fullCostEntry`): the customer `price`, the vendor
// `estimate`, `markup`, and an optional `actual`. Every other viewer receives
// the redacted projection (`redactedCostEntry`) the API builds field-by-field —
// the stored price as a bare amount, never the vendor cost or markup behind it
// (see `redactCostEntry`/`applyTicketVisibility` in the API). The two are
// disjoint (each forbids the other's discriminating fields via
// `additionalProperties`, and `price` is an object on one and an integer on the
// other), so `costs.items` is their `oneOf`.
const fullCostEntrySchema = {
  type: "object",
  additionalProperties: false,
  required: costEntryRequired,
  properties: {
    ...costEntryProperties,
    // A ticket cost can also be voided, which the standalone kind has no
    // ticket to be withdrawn from.
    billingReview: costBillingReview([
      "writtenOff",
      "voided",
      "reinstated",
      "divergenceAcknowledged",
    ]),
    workItemId: {
      type: ["string", "null"],
      default: null,
      description:
        "The Work item on this ticket that produced the cost. Many entries " +
        "may name one visit, so a single trip's labor and materials can be " +
        "itemized. Cleared when the Work item is removed — the money record " +
        "outlives the scheduling record. Internal, redacted org-side.",
    },
    voided: {
      type: "boolean",
      default: false,
      description:
        "Server-maintained denormalization of billingReview (writtenOff " +
        "pattern): true after a voided entry until a reinstated entry " +
        "follows. A voided cost is withdrawn: it counts toward " +
        "neither the approval gate nor financial completion and leaves the " +
        "uninvoiced pool, but stays on the ticket so every viewer sees it " +
        "was voided. Never set by clients.",
    },
  },
} as const;

const redactedCostEntrySchema = {
  type: "object",
  additionalProperties: false,
  required: ["id", "description", "currency", "price"],
  properties: {
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
    price: {
      type: "integer",
      minimum: 0,
      description:
        "The entry's stored customer price in integer cents — the whole of " +
        "what an org-side viewer receives, flattened out of the stored " +
        "price phase so none of its recording metadata comes with it.",
    },
    voided: {
      type: "boolean",
      default: false,
      description:
        "Whether the entry was voided (withdrawn). Carried through " +
        "redaction so an org-side viewer sees the cost no longer counts.",
    },
    settled: {
      type: "boolean",
      default: false,
      description:
        "Whether a bill has claimed the entry or it was written off, so it " +
        "can no longer be voided. Carried through redaction as a bare flag: " +
        "neither the bill nor the write-off itself is exposed org-side.",
    },
  },
} as const;

// A Work item is a scheduled performance of work on the ticket — who is coming,
// when, and what for. Timing is wall-clock at the property, not an instant: vendors
// commit to "Thursday" as often as to "Thursday at 10", and an instant would
// force a fake time on the day-only case and drift a day across the property's
// timezone on every render. `date` and `time` therefore mean exactly what the
// building reads off them, and the conversation event can be minted without
// resolving a timezone at all.
const workItemSchema = {
  type: "object",
  additionalProperties: false,
  required: ["id", "performer", "date"],
  properties: {
    id: {
      type: "string",
      description: "The ID of the work item.",
    },
    performer: {
      type: "object",
      additionalProperties: false,
      required: ["id", "discriminator", "name"],
      description:
        "Who is performing the work — a Vendor, or a staff User the work is " +
        "scheduled to. A discriminated reference in the same shape as " +
        "`assignedTo`, but orthogonal to it: `assignedTo` is who owns the " +
        "ticket, this is who shows up for one visit.",
      properties: {
        id: {
          type: "string",
          description: "The ID of the performer.",
        },
        discriminator: {
          type: "string",
          enum: ["vendor", "user"],
          description: "The discriminator of the performer.",
        },
        name: {
          type: "string",
          description:
            "The performer's name, denormalized at schedule time for rendering.",
        },
      },
    },
    date: {
      type: "string",
      pattern: "^\\d{4}-\\d{2}-\\d{2}$",
      description:
        "The calendar date of the visit as YYYY-MM-DD, read in the property's timezone.",
    },
    time: {
      type: ["string", "null"],
      pattern: "^([01]\\d|2[0-3]):[0-5]\\d$",
      default: null,
      description:
        "The 24-hour local start time as HH:mm, or null for a day-only " +
        "commitment. Day-only is first-class, not a missing value.",
    },
    description: {
      type: ["string", "null"],
      default: null,
      description:
        "What the visit is for, in the scheduler's words — the scope handed " +
        "to whoever shows up. Optional: a booking with nothing to add carries " +
        "null, and the performer and the slot are the whole record.",
    },
    scheduledBy: {
      type: ["string", "null"],
      default: null,
      description:
        "The ID of the user whose write created this work item. Null when the write was not user-attributable.",
    },
    scheduledAt: {
      $ref: "definitions.json#/definitions/date",
      description: "When the work item was created.",
    },
    noCharge: {
      type: ["object", "null"],
      additionalProperties: false,
      required: ["setBy", "setAt"],
      default: null,
      description:
        "The explicit decision that this visit will never be billed, or " +
        "null while no decision has been made. A disposition rather than a " +
        "zero-dollar cost: nothing was charged, so there is no amount to " +
        "record, and financial completion asks whether every visit is " +
        "either billed or deliberately not. Reversible while the ticket is " +
        "active; frozen once it closes.",
      properties: {
        setBy: {
          type: ["string", "null"],
          default: null,
          description:
            "The ID of the user whose write set the disposition. Null when " +
            "the write was not user-attributable.",
        },
        setAt: {
          $ref: "definitions.json#/definitions/date",
          description: "When the disposition was set.",
        },
      },
    },
  },
} as const;

export const ticketSchema = {
  $schema: "http://json-schema.org/draft-07/schema",
  $id: "ticket.json",
  title: "Ticket",
  description: "A ticket is a request from a user.",
  type: "object",
  required: [
    "id",
    "conversation",
    "requester",
    "openedBy",
    "assignedTo",
    "status",
    "priority",
    "tags",
    "createdAt",
    "updatedAt",
  ],
  additionalProperties: false,
  properties: {
    id: {
      $ref: "definitions.json#/definitions/id",
    },
    propertyId: {
      type: "string",
      description:
        "ID of the property this entity belongs to. Optional — used as a per-document filter inside the org-scoped database.",
    },
    type: {
      type: "string",
      enum: ["ticket"],
      default: "ticket",
    },
    number: {
      type: "string",
      description: "The number of the ticket.",
    },
    issueId: {
      type: "string",
      description: "The ID of the issue that this ticket is associated with.",
    },
    parentAutomationId: {
      type: "string",
      description: "The ID of the automation that created this ticket.",
    },
    conversation: {
      type: "array",
      default: [],
      description: "The conversation history of the ticket.",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["id", "discriminator", "timestamp", "body", "author"],
        properties: {
          id: {
            type: "string",
            description: "The ID of the message.",
          },
          discriminator: {
            type: "string",
            enum: [
              "message",
              "opened",
              "assigned",
              "rated",
              "scheduled",
              "collaboratorAdded",
              "collaboratorRemoved",
              "statusChanged",
              "priorityChanged",
              "scheduleDateChanged",
              "locationChanged",
              "issueChanged",
              "nudged",
              "approvalRequested",
              "approvalApproved",
              "approvalDenied",
              "workScheduled",
              "workRescheduled",
              "workCanceled",
              "costRecorded",
              "costPriceChanged",
              "costVoided",
            ],
            default: "message",
            description: "The discriminator of the message.",
          },
          isInternal: {
            type: "boolean",
            description:
              "Whether the message is internal to the assignedTo and collaborators. Internal messages are not visible to the requester.",
            default: false,
          },
          author: {
            type: "object",
            additionalProperties: false,
            required: ["id", "discriminator", "name"],
            properties: {
              id: {
                type: "string",
                description: "The ID of the author of the message.",
              },
              discriminator: {
                type: "string",
                enum: ["user", "vendor", "system"],
                description: "The discriminator of the author of the message.",
              },
              name: {
                type: "string",
                description: "The name of the author of the message.",
              },
            },
          },
          timestamp: {
            $ref: "definitions.json#/definitions/date",
            description: "The ISO 8601 timestamp of the message.",
          },
          body: {
            type: "string",
            description: "The body of the message.",
          },
          parsedBody: {
            type: "object",
            additionalProperties: false,
            description:
              "An object containing the parsed body of the message for mentions.",
            properties: {
              content: {
                type: "array",
                minItems: 1,
                description:
                  "Rich-text block nodes (ADR 0012). Present = rich message: `body` is the server-derived plain-text projection of this tree, and the legacy text/mentions fields are not written.",
                items: {
                  anyOf: [
                    richTextParagraphNode,
                    richTextBulletListNode,
                    richTextOrderedListNode,
                  ],
                },
              },
              text: {
                type: "string",
                description: "The mention text (legacy tokenized format).",
              },
              mentions: {
                type: "array",
                default: [],
                items: {
                  type: "object",
                  additionalProperties: false,
                  required: [
                    "discriminator",
                    "id",
                    "index",
                    "length",
                    "originalText",
                  ],
                  properties: {
                    id: {
                      type: "string",
                      description: "The ID of the mention.",
                    },
                    discriminator: {
                      type: "string",
                      enum: ["user", "vendor", "system"],
                      description:
                        "The discriminator of entity that was mentioned.",
                    },
                    index: {
                      type: "integer",
                      description: "The index of the mention in the message.",
                    },
                    length: {
                      type: "integer",
                      description: "The length of the mention in the message.",
                    },
                    originalText: {
                      type: "string",
                      description: "The original text of the mention.",
                    },
                  },
                },
              },
            },
          },
          statusChanged: {
            type: "object",
            additionalProperties: false,
            required: ["from", "to"],
            description:
              "Structured status transition for `statusChanged` entries. Lets consumers detect reopens (from solved/closed to open) without parsing the body text.",
            properties: {
              from: {
                type: "string",
                enum: ["open", "pending", "solved", "closed"],
                description: "The status the ticket transitioned from.",
              },
              to: {
                type: "string",
                enum: ["open", "pending", "solved", "closed"],
                description: "The status the ticket transitioned to.",
              },
            },
          },
          readBy: {
            type: "array",
            default: [],
            items: {
              type: "string",
            },
            description: "The IDs of the users who have read the message.",
          },
          media: {
            anyOf: [{ $ref: "mediaFile.json" }, { type: "null" }],
            description: "The media file associated with the message.",
          },
          attachments: {
            type: "array",
            items: { $ref: "mediaFile.json" },
            description:
              "Files attached to the message. Supersedes the singular media.",
          },
        },
      },
    },
    subject: {
      type: "string",
      description: "The subject of the ticket.",
    },
    openedBy: {
      type: "object",
      additionalProperties: false,
      required: ["id", "discriminator", "name"],
      properties: {
        id: {
          type: "string",
        },
        discriminator: {
          type: "string",
          enum: ["user", "system"],
        },
        name: {
          type: "string",
        },
      },
    },
    requester: {
      type: "object",
      additionalProperties: false,
      required: ["id", "discriminator", "name"],
      properties: {
        id: {
          type: "string",
          description: "The ID of the requester.",
        },
        discriminator: {
          type: "string",
          enum: ["user", "vendor", "system", "device"],
          description: "The discriminator of the requester.",
        },
        name: {
          type: "string",
          description: "The name of the requester.",
        },
        photo: {
          anyOf: [
            { $ref: "mediaFile.json" },
            { type: "null" },
            { type: "string" },
          ],
          description: "The photo of the requester.",
        },
      },
    },
    assignedTo: {
      type: ["object", "null"],
      default: null,
      additionalProperties: false,
      required: ["id", "discriminator", "name"],
      properties: {
        id: {
          type: "string",
          description: "The ID of the assigned to.",
        },
        discriminator: {
          type: "string",
          enum: ["user", "vendor"],
          description: "The discriminator of the assigned to.",
        },
        name: {
          type: "string",
          description: "The name of the assigned to.",
        },
        photo: {
          anyOf: [
            { $ref: "mediaFile.json" },
            { type: "null" },
            { type: "string" },
          ],
          description: "The photo of the assigned to.",
        },
      },
    },
    notify: {
      type: "array",
      description:
        "A list of entities to notify when this ticket is created or resolved.",
      default: [],
      items: {
        type: "object",
        required: ["id", "discriminator"],
        additionalProperties: false,
        properties: {
          id: {
            type: "string",
            description: "The ID of the entity to notify.",
          },
          discriminator: {
            type: "string",
            enum: ["user"],
          },
        },
      },
    },
    collaborators: {
      type: "array",
      default: [],
      description: "A list of entities who will collaborate on this ticket.",
      items: {
        type: "object",
        required: ["id", "name", "discriminator"],
        additionalProperties: false,
        properties: {
          id: {
            type: "string",
          },
          name: {
            type: "string",
          },
          discriminator: {
            type: "string",
            enum: ["user", "vendor"],
          },
        },
      },
    },
    location: {
      type: "object",
      required: ["discriminator", "name"],
      additionalProperties: false,
      properties: {
        id: {
          type: "string",
        },
        discriminator: {
          type: "string",
          enum: ["space", "property", "customText"],
        },
        name: {
          type: "string",
        },
      },
    },
    status: {
      type: "string",
      enum: ["open", "pending", "solved", "closed"],
      default: "open",
    },
    priority: {
      type: "string",
      enum: ["low", "normal", "high", "critical"],
      default: "normal",
    },
    priorityRank: {
      type: "integer",
      minimum: 1,
      maximum: 4,
      description:
        "Server-derived numeric rank of priority (low=1, normal=2, high=3, critical=4). Denormalized to support priority sorting; never set by clients.",
    },
    reopenCount: {
      type: "integer",
      minimum: 0,
      default: 0,
      description:
        'Server-derived count of transitions back to "open" that followed a solve/close. reopenCount > 0 answers "was this ticket ever reopened?" in O(1); maintained at the repository layer across every status-write path. Never set by clients.',
    },
    work: {
      type: "array",
      default: [],
      description:
        "Work items scheduled on the ticket: who is coming, when, and what for. Many per ticket, including repeat visits by the same performer. Carries no lifecycle status — the conversation log is the history and a past-dated entry is implicitly done. Never redacted; vendor identity is already public in assignment.",
      items: workItemSchema,
    },
    costs: {
      type: "array",
      default: [],
      description:
        "Cost line items recorded on the ticket. Each entry stores the customer price and the vendor cost side by side and keeps them independent: the price is seeded from the estimate and markup at recording, and nothing about the vendor side moves it afterwards. Every entry arrives as either the full vendor shape or the redacted price-only shape depending on whether the viewer may see the cost split.",
      items: {
        oneOf: [fullCostEntrySchema, redactedCostEntrySchema],
      },
    },
    approvals: {
      type: "array",
      default: [],
      description:
        "Approval request history for the ticket. At most one pending record at a time; records are immutable once decided (enforced by use cases).",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["id", "amount", "approverUserIds", "status", "requestedAt"],
        properties: {
          id: {
            type: "string",
            description: "The ID of the approval record.",
          },
          amount: {
            type: "integer",
            minimum: 0,
            description:
              "The ticket's customer price total in integer cents, frozen at request time.",
          },
          approverUserIds: {
            type: "array",
            minItems: 1,
            items: {
              type: "string",
            },
            description:
              "The effective approver set for this request, frozen at request time.",
          },
          status: {
            type: "string",
            enum: ["pending", "approved", "denied"],
            default: "pending",
          },
          requestedAt: {
            $ref: "definitions.json#/definitions/date",
            description: "When the approval was requested.",
          },
          requestedBy: {
            type: ["string", "null"],
            default: null,
            description:
              "The ID of the user whose write created this request, frozen at request time. Null when the write was not user-attributable.",
          },
          decidedBy: {
            type: ["string", "null"],
            default: null,
            description: "The ID of the approver who decided the request.",
          },
          decidedAt: {
            anyOf: [
              { $ref: "definitions.json#/definitions/date" },
              { type: "null" },
            ],
            default: null,
            description: "When the request was decided.",
          },
          comment: {
            type: ["string", "null"],
            default: null,
            description:
              "The decider's comment. Required on deny, optional on approve (enforced by use cases).",
          },
        },
      },
    },
    dneAmount: {
      type: ["integer", "null"],
      minimum: 0,
      description:
        "The effective do-not-exceed amount in integer cents the approval gate compares against, resolved per read from the organization and property Concierge settings. Never stored on the document and never set by clients; absent on payloads where it could not be resolved. Viewer-independent: the DNE is the customer's own contract term, so org-side viewers see it.",
    },
    approvalState: {
      type: "string",
      enum: ["clear", "awaitingApproval", "denied"],
      default: "clear",
      description:
        "Server-maintained denormalization of the approval gate, updated on every cost or approval write (reopenCount pattern) so queue filters get O(1) access. Never set by clients.",
    },
    tags: {
      type: "array",
      default: [],
      items: {
        type: "string",
      },
    },
    rating: {
      type: "number",
      minimum: 0,
      maximum: 5,
    },
    ratingComment: {
      type: "string",
    },
    scheduleDate: {
      $ref: "definitions.json#/definitions/date",
    },
    createdAt: {
      $ref: "definitions.json#/definitions/date",
    },
    updatedAt: {
      $ref: "definitions.json#/definitions/date",
    },
    solvedAt: {
      $ref: "definitions.json#/definitions/date",
    },
    lastMessageAt: {
      $ref: "definitions.json#/definitions/date",
      description:
        "Server-derived timestamp of the latest conversation message; initialized to createdAt when no message exists. Denormalized to support recency sorting; never set by clients.",
    },
    closedAt: {
      $ref: "definitions.json#/definitions/date",
    },
    deletedAt: {
      $ref: "definitions.json#/definitions/date",
    },
  },
} as const;

type TicketSchemaBase = FromSchema<
  typeof ticketSchema,
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

/** A stored cost entry: the full shape, with `price`, `estimate` and `markup`. */
export type TicketCostEntry = Extract<
  NonNullable<TicketSchemaBase["costs"]>[number],
  { estimate: unknown }
>;

/** One scheduled performance of work on a ticket. */
export type TicketWorkItem = NonNullable<TicketSchemaBase["work"]>[number];

/** One append-only billing review entry on a stored cost entry. */
export type TicketCostBillingReviewEntry = NonNullable<
  TicketCostEntry["billingReview"]
>[number];

// The runtime `costs.items` schema is a `oneOf` so a `Ticket` model validates
// both wire shapes a read can return (see the schema comment), which makes the
// derived element type a `full | redacted` union. A stored ticket, though, only
// ever holds the full shape — the redacted projection exists solely at the API
// read seam (`redactTicketCostSplit`, which casts through `unknown`). Model and
// write-path consumers reason about the stored document, so `costs` is narrowed
// back to the full entry here; the redacted shape stays a validation-only
// concern rather than leaking into every `ticket.costs` dereference.
export type TicketSchema = Omit<TicketSchemaBase, "costs"> & {
  costs?: TicketCostEntry[];
};
