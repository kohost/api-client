import defs, { ISODateString } from "./definitions";
import type { FromSchema } from "json-schema-to-ts";

export const emailMessageSchema = {
  $schema: "http://json-schema.org/draft-07/schema",
  $id: "emailMessage.json",
  title: "Email Message",
  type: "object",
  required: ["id", "type", "to", "from", "status", "subject"],
  additionalProperties: false,
  properties: {
    id: {
      $ref: "definitions.json#/definitions/id",
    },
    type: {
      type: "string",
      default: "emailMessage",
      enum: ["emailMessage"],
    },
    to: {
      type: "string",
    },
    from: {
      type: "string",
      description: "Must be in the format of 'Sender <email@example.com>",
    },
    subject: {
      type: "string",
    },
    status: {
      type: "string",
      enum: [
        "queued",
        "sending",
        "sent",
        "deferred",
        "delivered",
        "undelivered",
        "bounced",
        "blocked",
        "receiving",
        "received",
        "opened",
        "clicked",
        "unsubscribed",
        "spamReport",
      ],
    },
    statusMessage: {
      type: "string",
    },
    html: {
      type: "string",
    },
    text: {
      type: "string",
    },
    driver: {
      type: "string",
    },
    headers: {
      type: "object",
    },
    replyTo: {
      type: ["string", "array"],
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

export type EmailMessageSchema = FromSchema<
  typeof emailMessageSchema,
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
