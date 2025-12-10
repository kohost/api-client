import defs from "./definitions";
import type { FromSchema } from "json-schema-to-ts";

export const notificationSchema = {
  $schema: "http://json-schema.org/draft-07/schema",
  $id: "notification.json",
  title: "Notification",
  type: "object",
  required: ["id", "type", "discriminator", "content"],
  additionalProperties: false,
  properties: {
    id: {
      type: "string",
    },
    type: {
      type: "string",
      default: "notification",
      enum: ["notification"],
    },
    isEnabled: {
      type: "boolean",
      default: true,
    },
    name: {
      type: "string",
    },
    discriminator: {
      type: "string",
      enum: ["sms", "email", "push"],
    },
    content: {
      type: "string",
    },
    subject: {
      type: "string",
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
} as const;

export type NotificationSchema = FromSchema<
  typeof notificationSchema,
  { references: [typeof defs] }
>;
