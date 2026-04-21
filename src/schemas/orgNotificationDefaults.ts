import defs, { ISODateString } from "./definitions";
import type { FromSchema } from "json-schema-to-ts";

export const notificationEventDiscriminators = [
  "ticketAssignedToMe",
  "mentionedInTicket",
  "messageOnMyTicket",
  "ticketCreatedAsObserver",
  "ticketResolvedAsObserver",
  "ticketResolvedAsAssignee",
] as const;

export const notificationChannels = [
  "email",
  "sms",
  "push",
  "whatsapp",
] as const;

export const orgNotificationDefaultsSchema = {
  $schema: "http://json-schema.org/draft-07/schema",
  $id: "orgNotificationDefaults.json",
  title: "OrgNotificationDefaults",
  type: "object",
  required: ["id", "type", "organizationId", "notifications"],
  additionalProperties: false,
  properties: {
    id: {
      $ref: "definitions.json#/definitions/id",
    },
    type: {
      type: "string",
      default: "orgNotificationDefaults",
      enum: ["orgNotificationDefaults"],
    },
    organizationId: {
      type: "string",
    },
    notifications: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["discriminator", "channels", "locked"],
        properties: {
          discriminator: {
            type: "string",
            enum: [
              "ticketAssignedToMe",
              "mentionedInTicket",
              "messageOnMyTicket",
              "ticketCreatedAsObserver",
              "ticketResolvedAsObserver",
              "ticketResolvedAsAssignee",
            ],
          },
          channels: {
            type: "array",
            items: {
              type: "string",
              enum: ["email", "sms", "push", "whatsapp"],
            },
          },
          locked: {
            type: "boolean",
            default: false,
          },
        },
      },
    },
    createdAt: {
      $ref: "definitions.json#/definitions/date",
    },
    updatedAt: {
      $ref: "definitions.json#/definitions/date",
    },
  },
} as const;

export const indexes = [{ organizationId: 1 }] as const;

export type OrgNotificationDefaultsSchema = FromSchema<
  typeof orgNotificationDefaultsSchema,
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
