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
    name: {
      type: "string",
    },
    type: {
      type: "string",
      enum: ["switch"],
      default: "switch",
    },
    discriminator: {
      type: "string",
      enum: ["light", "fan", "irrigation"],
    },
    supportedNotifications: {
      $ref: "definitions.json#/definitions/supportedNotifications",
    },
    notification: {
      $ref: "definitions.json#/definitions/notification",
    },
    driver: {
      $ref: "definitions.json#/definitions/driver",
    },
    offline: {
      type: "boolean",
    },
    state: {
      type: "string",
      enum: ["on", "off"],
    },
    systemId: {
      $ref: "definitions.json#/definitions/systemId",
    },
    watts: {
      $ref: "definitions.json#/definitions/watts",
    },
    icon: {
      type: "string",
    },
    manufacturer: {
      type: "string",
    },
    modelNumber: {
      type: "string",
    },
    serialNumber: {
      type: "string",
    },
    firmwareVersion: {
      type: "string",
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
