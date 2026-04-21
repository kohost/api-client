import defs, { ISODateString } from "./definitions";
import type { FromSchema } from "json-schema-to-ts";

export const pushSubscriptionSchema = {
  $schema: "http://json-schema.org/draft-07/schema",
  $id: "pushSubscription.json",
  title: "PushSubscription",
  type: "object",
  required: ["id", "type", "userId", "endpoint", "keys"],
  additionalProperties: false,
  properties: {
    id: {
      $ref: "definitions.json#/definitions/id",
    },
    type: {
      type: "string",
      default: "pushSubscription",
      enum: ["pushSubscription"],
    },
    userId: {
      type: "string",
    },
    endpoint: {
      type: "string",
      format: "uri",
    },
    keys: {
      type: "object",
      additionalProperties: false,
      required: ["p256dh", "auth"],
      properties: {
        p256dh: {
          type: "string",
        },
        auth: {
          type: "string",
        },
      },
    },
    userAgent: {
      type: "string",
    },
    lastSeenAt: {
      $ref: "definitions.json#/definitions/date",
    },
    createdAt: {
      $ref: "definitions.json#/definitions/date",
    },
    updatedAt: {
      $ref: "definitions.json#/definitions/date",
    },
  },
} as const;

export const indexes = [
  { key: { endpoint: 1 }, unique: true },
  { key: { userId: 1 } },
] as const;

export type PushSubscriptionSchema = FromSchema<
  typeof pushSubscriptionSchema,
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
