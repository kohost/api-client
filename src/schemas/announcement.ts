import defs, { ISODateString } from "./definitions";
import type { FromSchema } from "json-schema-to-ts";

export const announcementSchema = {
  $schema: "http://json-schema.org/draft-07/schema",
  $id: "announcement.json",
  title: "Announcement",
  description: "Announcement message sent to users",
  type: "object",
  required: ["id", "type", "body"],
  properties: {
    id: { $ref: "definitions.json#/definitions/id" },
    propertyId: {
      type: "string",
      description:
        "ID of the property this entity belongs to. Optional — used as a per-document filter inside the org-scoped database.",
    },
    type: {
      type: "string",
      enum: ["announcement"],
      default: "announcement",
    },
    audience: {
      $ref: "definitions.json#/definitions/audience",
      description:
        "Who this announcement was directed at on the people axis. PA surfaces are the other axis and never reach the emergency-contact roster.",
    },
    channels: {
      type: "array",
      description: "Personal channels this announcement was sent over.",
      items: {
        type: "string",
        enum: ["sms", "email"],
      },
    },
    subject: {
      type: "string",
      description: "Email subject, and the title shown on a surface.",
    },
    surfaces: {
      type: "array",
      description:
        "Surface channels the announcement was broadcast to, as the sender selected them. `category` is open for future surface kinds; only `pa` ships today.",
      items: {
        type: "object",
        required: ["category", "kind"],
        properties: {
          category: {
            type: "string",
            enum: ["pa"],
          },
          kind: {
            type: "string",
            enum: ["all", "spaces", "devices"],
          },
          spaceIds: {
            type: "array",
            items: { type: "string" },
          },
          deviceIds: {
            type: "array",
            items: { type: "string" },
          },
          outputs: {
            type: "array",
            description: "PA output zones to page; all zones when omitted.",
            items: { type: "string" },
          },
        },
        additionalProperties: false,
      },
    },
    body: {
      type: "string",
    },
    media: {
      $ref: "mediaFile.json",
    },
    sentBy: {
      type: "string",
    },
    tags: {
      type: "array",
      items: {
        type: "string",
      },
    },
    createdAt: {
      $ref: "definitions.json#/definitions/date",
    },
    updatedAt: {
      $ref: "definitions.json#/definitions/date",
    },
    deletedAt: {
      $ref: "definitions.json#/definitions/date",
    },
  },
  additionalProperties: false,
} as const;

export type AnnouncementSchema = FromSchema<
  typeof announcementSchema,
  {
    references: [typeof defs];
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
