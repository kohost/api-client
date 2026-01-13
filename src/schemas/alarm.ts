import defs, { ISODateString } from "./definitions";
import type { FromSchema } from "json-schema-to-ts";

export const alarmSchema = {
  $schema: "http://json-schema.org/draft-07/schema",
  $id: "alarm.json",
  title: "Alarm",
  description: "Any smart alarm system",
  type: "object",
  definitions: {
    securityMode: {
      type: ["string", "null"],
      enum: [
        "arming",
        "disarming",
        "armed",
        "disarmed",
        "intrusion",
        "fire",
        "medical",
        null,
      ],
    },
  },
  required: ["id", "type", "areas", "zones", "driver"],
  additionalProperties: false,
  properties: {
    id: {
      $ref: "definitions.json#/definitions/id",
    },
    name: {
      type: "string",
      description: "Name of the alarm",
    },
    offline: {
      type: "boolean",
    },
    type: {
      type: "string",
      enum: ["alarm"],
      default: "alarm",
    },
    systemId: {
      $ref: "definitions.json#/definitions/systemId",
    },
    driver: {
      $ref: "definitions.json#/definitions/driver",
    },
    alerts: {
      $ref: "definitions.json#/definitions/alerts"
    },
    areas: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: {
            $ref: "definitions.json#/definitions/id",
          },
          name: {
            type: "string",
          },
          supportedSecurityModes: {
            type: "array",
            items: { $ref: "#/definitions/securityMode" },
          },
          securityMode: {
            $ref: "#/definitions/securityMode",
          },
        },
        additionalProperties: false,
      },
    },
    zones: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: {
            $ref: "definitions.json#/definitions/id",
          },
          name: {
            type: "string",
          },
          secure: {
            type: ["boolean", "null"],
          },
          bypassed: {
            type: ["boolean", "null"],
          },
          offline: {
            type: "boolean",
          },
          batteryLevel: {
            $ref: "definitions.json#/definitions/batteryLevel",
          },
        },
        additionalProperties: false,
      },
    },
    supportedNotifications: {
      $ref: "definitions.json#/definitions/supportedNotifications",
    },
    notification: {
      $ref: "definitions.json#/definitions/notification",
    },
    code: {
      type: "string",
    },
    chime: {
      type: "boolean",
      description: "Chime enabled",
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
    address: {
      $ref: "definitions.json#/definitions/address",
    },
    batteryLevel: {
      $ref: "definitions.json#/definitions/batteryLevel",
    },
    powerLevel: {
      $ref: "definitions.json#/definitions/batteryLevel",
    },
  },
} as const;

export type AlarmSchema = FromSchema<
  typeof alarmSchema,
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
