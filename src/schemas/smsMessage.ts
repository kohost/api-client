import defs from "./definitions";
import type { FromSchema } from "json-schema-to-ts";

export const smsMessageSchema = {
  $schema: "http://json-schema.org/draft-07/schema",
  $id: "smsMessage.json",
  title: "Sms Message",
  type: "object",
  required: ["to", "from", "status"],
  properties: {
    id: {
      $ref: "definitions.json#/definitions/id",
    },
    type: {
      type: "string",
      default: "smsMessage",
      enum: ["smsMessage", "whatsappMessage"],
    },
    to: {
      type: "string",
    },
    from: {
      type: "string",
    },
    media: {
      type: "string",
      format: "uri",
    },
    status: {
      type: "string",
      enum: [
        "queued",
        "accepted",
        "sending",
        "sent",
        "failed",
        "delivered",
        "undelivered",
        "receiving",
        "received",
        "read",
      ],
    },
    body: {
      type: "string",
    },
    driver: {
      type: "string",
    },
    appData: {
      type: "object",
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
    systemId: {
      $ref: "definitions.json#/definitions/systemId",
    },
  },
} as const;

export type SmsMessageSchema = FromSchema<
  typeof smsMessageSchema,
  { references: [typeof defs] }
>;
