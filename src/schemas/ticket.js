export default {
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
    },
    issueId: {
      type: "string",
    },
    conversation: {
      type: "array",
      default: [],
      items: {
        type: "object",
        additionalProperties: false,
        required: ["id", "discriminator", "timestamp", "body"],
        properties: {
          id: {
            type: "string",
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
          },
          userId: {
            type: "string",
          },
          userName: {
            type: "string",
          },
          vendorId: {
            type: "string",
          },
          vendorName: {
            type: "string",
          },
          systemId: {
            type: "string",
          },
          systemName: {
            type: "string",
          },
          timestamp: {
            $ref: "definitions.json#/definitions/createdAt",
          },
          body: {
            type: "string",
          },
          parsedBody: {
            type: "object",
            additionalProperties: false,
            properties: {
              text: {
                type: "string",
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
                    },
                    discriminator: {
                      type: "string",
                      enum: ["user", "vendor", "system"],
                    },
                    index: {
                      type: "integer",
                    },
                    length: {
                      type: "integer",
                    },
                    originalText: {
                      type: "string",
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
          },
          media: {
            anyOf: [{ $ref: "mediaFile.json" }, { type: "null" }],
          },
        },
      },
    },
    subject: {
      type: "string",
    },
    openedBy: {
      type: "object",
      properties: {
        userId: {
          type: "string",
        },
        userName: {
          type: "string",
        },
        systemId: {
          type: "string",
        },
        systemName: {
          type: "string",
        },
      },
    },
    requester: {
      type: "object",
      properties: {
        systemId: {
          type: "string",
        },
        systemName: {
          type: "string",
        },
        systemPhoto: {
          anyOf: [
            { $ref: "mediaFile.json" },
            { type: "null" },
            { type: "string" },
          ],
        },
        userId: {
          type: "string",
        },
        userName: {
          type: "string",
        },
        userPhoto: {
          anyOf: [
            { $ref: "mediaFile.json" },
            { type: "null" },
            { type: "string" },
          ],
        },
        deviceId: {
          type: "string",
        },
        roomId: {
          type: "string",
        },
        reservationId: {
          type: "string",
        },
        spaceId: {
          type: "string",
        },
        spaceName: {
          type: "string",
        },
      },
    },
    assignedTo: {
      type: "object",
      properties: {
        userId: {
          type: "string",
        },
        userName: {
          type: "string",
        },
        userPhoto: {
          anyOf: [
            { $ref: "mediaFile.json" },
            { type: "null" },
            { type: "string" },
          ],
        },
        vendorId: {
          type: "string",
        },
        vendorName: {
          type: "string",
        },
        vendorPhoto: {
          anyOf: [
            { $ref: "mediaFile.json" },
            { type: "null" },
            { type: "string" },
          ],
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
    tipAmount: {
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
    closedAt: {
      $ref: "definitions.json#/definitions/date",
    },
  },
};
