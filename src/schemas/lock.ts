import defs, { ISODateString } from "./definitions";
import type { FromSchema } from "json-schema-to-ts";

export const lockSchema = {
  $schema: "http://json-schema.org/draft-07/schema",
  $id: "lock.json",
  title: "Lock",
  description: "Any smart lock",
  type: "object",
  additionalProperties: false,
  properties: {
    id: {
      $ref: "definitions.json#/definitions/id",
    },
    name: {
      type: "string",
    },
    type: {
      type: "string",
      enum: ["lock"],
      default: "lock",
    },
    offline: {
      type: "boolean",
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
    alerts: {
      $ref: "definitions.json#/definitions/alerts"
    },
    state: {
      type: ["string", "null"],
      enum: ["locked", "unlocked", null],
    },
    mode: {
      type: ["string", "null"],
      enum: [
        "normal",
        "autoLock",
        "emergencyOpen",
        "emergencyClose",
        "holdOpen",
        "lockdown",
        null,
      ],
      description:
        "emergencyOpen and emergencyClose are deprecated and can be removed once Salto, Paxton and Geovision drivers are updated",
      default: null,
    },
    supportedModes: {
      type: "array",
      uniqueItems: true,
      items: {
        enum: [
          "normal",
          "autoLock",
          "emergencyOpen",
          "emergencyClose",
          "holdOpen",
          "lockdown",
          null,
        ],
      },
    },
    batteryLevel: {
      $ref: "definitions.json#/definitions/batteryLevel",
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
  required: ["id", "type", "state", "driver"],
} as const;

export type LockSchema = FromSchema<
  typeof lockSchema,
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
