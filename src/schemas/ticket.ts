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
    "status",
    "tags",
    "createdAt",
    "updatedAt",
  ],
  additionalProperties: false,
  properties: {
    id: {
      $ref: "definitions.json#/definitions/id",
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
    conversation: {
      type: "array",
      default: [],
      description: "The conversation history of the ticket.",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["id", "discriminator", "timestamp", "body"],
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
              "tipped",
              "scheduled",
              "collaboratorAdded",
              "collaboratorRemoved",
              "statusChanged",
              "priorityChanged",
              "scheduleDateChanged",
              "locationChanged",
            ],
            default: "message",
            description: "The discriminator of the message.",
          },
          authorId: {
            type: "string",
            description: "The ID of the author of the message.",
          },
          authorName: {
            type: "string",
            description: "The name of the author of the message.",
          },
          authorDiscriminator: {
            type: "string",
            enum: ["user", "vendor", "system"],
            description: "The discriminator of the author of the message.",
          },
          /**
           * @deprecated - use authorId instead.
           */
          userId: {
            type: "string",
            description:
              "@deprecated - use authorId instead. The ID of the user who sent the message.",
          },
          /**
           * @deprecated - use authorName instead.
           */
          userName: {
            type: "string",
            description:
              "@deprecated - use authorName instead. The name of the user who sent the message.",
          },
          /**
           * @deprecated - use authorId instead.
           */
          vendorId: {
            type: "string",
            description:
              "@deprecated - use authorId instead. The ID of the vendor who sent the message.",
          },
          /**
           * @deprecated - use authorName instead.
           */
          vendorName: {
            type: "string",
            description:
              "@deprecated - use authorName instead. The name of the vendor who sent the message.",
          },
          /**
           * @deprecated - use authorId instead.
           */
          systemId: {
            type: "string",
            description:
              "@deprecated - use authorId instead. The ID of the system who sent the message.",
          },
          /**
           * @deprecated - use authorName instead.
           */
          systemName: {
            type: "string",
            description:
              "@deprecated - use authorName instead. The name of the system who sent the message.",
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
        /**
         * @deprecated - use id instead.
         */
        userId: {
          type: "string",
          description:
            "@deprecated - use id instead. The ID of the user who opened the ticket.",
        },
        /**
         * @deprecated - use name instead.
         */
        userName: {
          type: "string",
          description:
            "@deprecated - use name instead. The name of the user who opened the ticket.",
        },

        /**
         * @deprecated - use id instead.
         */
        systemId: {
          type: "string",
          description:
            "@deprecated - use id instead. The ID of the system who opened the ticket.",
        },
        /**
         * @deprecated - use name instead.
         */
        systemName: {
          type: "string",
          description:
            "@deprecated - use name instead. The name of the system who opened the ticket.",
        },
      },
    },
    requester: {
      type: "object",
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
        /**
         * @deprecated - use id instead.
         */
        systemId: {
          type: "string",
          description:
            "@deprecated - use id instead. The ID of the system who requested the ticket.",
        },
        /**
         * @deprecated - use name instead.
         */
        systemName: {
          type: "string",
          description:
            "@deprecated - use name instead. The name of the system who requested the ticket.",
        },
        /**
         * @deprecated - use photo instead.
         */
        systemPhoto: {
          anyOf: [
            { $ref: "mediaFile.json" },
            { type: "null" },
            { type: "string" },
          ],
          description:
            "@deprecated - use photo instead. The photo of the system who requested the ticket.",
        },
        /**
         * @deprecated - use id instead.
         */
        userId: {
          type: "string",
          description:
            "@deprecated - use id instead. The ID of the user who requested the ticket.",
        },
        /**
         * @deprecated - use name instead.
         */
        userName: {
          type: "string",
          description:
            "@deprecated - use name instead. The name of the user who requested the ticket.",
        },
        /**
         * @deprecated - use photo instead.
         */
        userPhoto: {
          anyOf: [
            { $ref: "mediaFile.json" },
            { type: "null" },
            { type: "string" },
          ],
          description:
            "@deprecated - use photo instead. The photo of the user who requested the ticket.",
        },
        /**
         * @deprecated - use id instead.
         */
        deviceId: {
          type: "string",
        },
        /**
         * @deprecated - This will be removed in a future version.
         */
        roomId: {
          type: "string",
          description:
            "@deprecated - This will be removed in a future version. The ID of the room who requested the ticket.",
        },
        /**
         * @deprecated - This will be removed in a future version.
         */
        reservationId: {
          type: "string",
          description:
            "@deprecated - This will be removed in a future version. The ID of the reservation who requested the ticket.",
        },
        /**
         * @deprecated - This will be removed in a future version.
         */
        spaceId: {
          type: "string",
          description:
            "@deprecated - This will be removed in a future version. The ID of the space who requested the ticket.",
        },
        /**
         * @deprecated - This will be removed in a future version.
         */
        spaceName: {
          type: "string",
          description:
            "@deprecated - This will be removed in a future version. The name of the space who requested the ticket.",
        },
      },
    },
    assignedTo: {
      type: "object",
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
        /**
         * @deprecated - use id instead.
         */
        userId: {
          type: "string",
          description:
            "@deprecated - use id instead. The ID of the user who assigned the ticket.",
        },
        /**
         * @deprecated - use name instead.
         */
        userName: {
          type: "string",
          description:
            "@deprecated - use name instead. The name of the user who assigned the ticket.",
        },
        /**
         * @deprecated - use photo instead.
         */
        userPhoto: {
          anyOf: [
            { $ref: "mediaFile.json" },
            { type: "null" },
            { type: "string" },
          ],
        },
        /**
         * @deprecated - use id instead.
         */
        vendorId: {
          type: "string",
          description:
            "@deprecated - use id instead. The ID of the vendor who assigned the ticket.",
        },
        /**
         * @deprecated - use name instead.
         */
        vendorName: {
          type: "string",
          description:
            "@deprecated - use name instead. The name of the vendor who assigned the ticket.",
        },
        /**
         * @deprecated - use photo instead.
         */
        vendorPhoto: {
          anyOf: [
            { $ref: "mediaFile.json" },
            { type: "null" },
            { type: "string" },
          ],
          description:
            "@deprecated - use photo instead. The photo of the vendor who assigned the ticket.",
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
          enum: ["space", "room", "property", "customText"],
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
      enum: ["low", "normal", "high"],
      default: "normal",
    },
    tags: {
      type: "array",
      default: [],
      items: {
        type: "string",
      },
    },
    department: {
      type: "string",
    },
    rating: {
      type: "number",
      minimum: 0,
      maximum: 5,
    },
    ratingComment: {
      type: "string",
    },
    /**
     * @deprecated - This will be removed in a future version.
     */
    tipAmount: {
      type: "string",
      description:
        "@deprecated - This will be removed in a future version. The amount of the tip.",
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
