import defs, { ISODateString } from "./definitions";
import type { FromSchema } from "json-schema-to-ts";

export const switchSchema = {
  $schema: "http://json-schema.org/draft-07/schema",
  $id: "switch.json",
  title: "Switch",
  description: "Any smart switch",
  type: "object",
  required: ["id", "type", "state", "driver"],
  properties: {
    id: {
      $ref: "definitions.json#/definitions/id",
    },
    propertyId: {
      type: "string",
      description: "ID of the property this entity belongs to. Optional — used as a per-document filter inside the org-scoped database.",
    },
    name: {
      type: "string",
    },
    type: {
      type: "string",
      enum: ["switch"],
      default: "switch",
      readOnly: true,
    },
    discriminator: {
      type: "string",
      enum: ["light", "fan", "irrigation"],
      readOnly: true,
    },
    alerts: {
      $ref: "definitions.json#/definitions/alerts"
    },
    supportedNotifications: {
      $ref: "definitions.json#/definitions/supportedNotifications",
    },
    notification: {
      $ref: "definitions.json#/definitions/notification",
    },
    driver: {
      $ref: "definitions.json#/definitions/driver",
      readOnly: true,
    },
    offline: {
      type: "boolean",
      readOnly: true,
    },
    state: {
      type: "string",
      enum: ["on", "off"],
    },
    systemId: {
      $ref: "definitions.json#/definitions/systemId",
      readOnly: true,
    },
    watts: {
      $ref: "definitions.json#/definitions/watts",
      readOnly: true,
    },
    icon: {
      type: "string",
    },
    manufacturer: {
      type: "string",
      readOnly: true,
    },
    modelNumber: {
      type: "string",
      readOnly: true,
    },
    serialNumber: {
      type: "string",
      readOnly: true,
    },
    firmwareVersion: {
      type: "string",
      readOnly: true,
    },
    restoresAt: {
      type: "string",
      format: "date-time",
    },
  },
} as const;

export type SwitchSchema = FromSchema<
  typeof switchSchema,
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
