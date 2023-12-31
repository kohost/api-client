import { type MediaFileSchema } from "./mediaFile.json";
import { type Definitions } from "./definitions.json";

const ticketStatus = ["open", "pending", "solved", "closed"] as const;

export const schema = {
  $schema: "http://json-schema.org/draft-07/schema",
  $id: "ticket.json",
  title: "Ticket",
  description: "A ticket is a request from a user.",
  type: "object",
  properties: {
    id: {
      $ref: "definitions.json#/definitions/id",
    },
    type: {
      type: "string",
      enum: ["ticket"],
      default: "ticket",
    },
    conversation: {
      type: "array",
      default: [],
      items: {
        type: "object",
        additionalProperties: false,
        properties: {
          id: {
            type: "string",
          },
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
          timestamp: {
            $ref: "definitions.json#/definitions/createdAt",
          },
          body: {
            type: "string",
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
        anyOf: [
          {
            required: ["id", "userId", "timestamp", "body"],
          },
          {
            required: ["id", "systemId", "timestamp", "body"],
          },
        ],
      },
    },

    openedBy: {
      type: "object",
      properties: {
        userId: {
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
      },
    },
    status: {
      type: "string",
      enum: ticketStatus,
      default: "open",
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
    tipAmount: {
      type: "string",
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
} as const;

type TicketStatus = (typeof ticketStatus)[number];

export interface TicketSchema {
  id: Definitions["id"];
  type: "ticket";
  conversation: {
    id: string;
    userId?: string;
    userName?: string;
    systemId?: string;
    systemName?: string;
    timestamp: Definitions["date"];
    body: string;
    readBy: string[];
    media?: MediaFileSchema | null;
  }[];
  openedBy?: {
    userId: string;
  };
  requester: {
    systemId?: string;
    systemName?: string;
    systemPhoto?: MediaFileSchema | string | null;
    userId?: string;
    userName?: string;
    userPhoto?: MediaFileSchema | string | null;
    deviceId?: string;
    roomId?: string;
    spaceId?: string;
    spaceName?: string;
  };
  assignedTo?: {
    userId?: string;
    userName?: string;
    userPhoto?: MediaFileSchema | string | null;
  };
  status: TicketStatus;
  tags: string[];
  rating?: number;
  ratingComment?: string;
  tipAmount?: string;
  createdAt: Definitions["date"];
  updatedAt: Definitions["date"];
  solvedAt?: Definitions["date"];
  closedAt?: Definitions["date"];
}
