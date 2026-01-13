import defs, { ISODateString } from "./definitions";
import type { FromSchema } from "json-schema-to-ts";

export const windowCoveringSchema = {
  $schema: "http://json-schema.org/draft-07/schema",
  $id: "windowCovering.json",
  title: "Window Covering",
  description: "Any smart window covering",
  required: ["id", "type", "position", "driver"],
  additionalProperties: false,
  type: "object",
  properties: {
    id: {
      $ref: "definitions.json#/definitions/id",
    },
    name: {
      type: "string",
    },
    type: {
      type: "string",
      enum: ["windowCovering"],
      default: "windowCovering",
    },
    discriminator: {
      type: "string",
      enum: ["basic", "variable"],
      default: "variable",
    },
    supportedNotifications: {
      $ref: "definitions.json#/definitions/supportedNotifications",
    },
    alerts: {
      $ref: "definitions.json#/definitions/alerts"
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
    position: {
      type: ["number", "null"],
      minimum: 0,
      maximum: 100,
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
  },
} as const;

export type WindowCoveringSchema = FromSchema<
  typeof windowCoveringSchema,
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
