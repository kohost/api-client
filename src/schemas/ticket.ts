import defs, { ISODateString } from "./definitions";
import type { FromSchema } from "json-schema-to-ts";
import type { mediaFileSchema } from "./mediaFile";

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
      description: "ID of the property this entity belongs to. Optional — used as a per-document filter inside the org-scoped database.",
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
              "nudged",
            ],
            default: "message",
            description: "The discriminator of the message.",
          },
          isInternal: {
            type: "boolean",
            description: "Whether the message is internal to the assignedTo and collaborators. Internal messages are not visible to the requester.",
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
              text: {
                type: "string",
                description: "The mention text.",
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
        "Server-derived count of transitions back to \"open\" that followed a solve/close. reopenCount > 0 answers \"was this ticket ever reopened?\" in O(1); maintained at the repository layer across every status-write path. Never set by clients.",
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
    autoCloseAt: {
      $ref: "definitions.json#/definitions/date",
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

export type TicketSchema = FromSchema<
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
