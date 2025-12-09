import defs from "./definitions";
import type { FromSchema } from "json-schema-to-ts";

export const dimmerSchema = {
  $schema: "http://json-schema.org/draft-07/schema",
  $id: "dimmer.json",
  title: "Dimmer",
  description: "Any smart dimmer",
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
      enum: ["dimmer"],
      default: "dimmer",
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
    level: {
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
  required: ["id", "type", "level", "driver"],
} as const;

export type DimmerSchema = FromSchema<
  typeof dimmerSchema,
  { references: [typeof defs] }
>;
