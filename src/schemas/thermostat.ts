import defs, { ISODateString } from "./definitions";
import type { FromSchema } from "json-schema-to-ts";

export const thermostatSchema = {
  $schema: "http://json-schema.org/draft-07/schema",
  $id: "thermostat.json",
  title: "Thermostat",
  description: "Any smart thermostat",
  type: "object",
  required: [
    "id",
    "type",
    "hvacMode",
    "fanMode",
    "hvacState",
    "fanState",
    "setpoints",
    "temperatureScale",
    "supportedHvacModes",
    "supportedFanModes",
    "driver",
  ],
  additionalProperties: false,
  properties: {
    id: {
      $ref: "definitions.json#/definitions/id",
    },
    name: {
      $ref: "definitions.json#/definitions/name",
    },
    type: {
      type: "string",
      enum: ["thermostat"],
      default: "thermostat",
    },
    driver: {
      $ref: "definitions.json#/definitions/driver",
    },
    alerts: {
      $ref: "definitions.json#/definitions/alerts"
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
    currentTemperature: {
      type: "number",
    },
    maxSafeCurrentTemp: {
      type: ["number", "null"],
      description: "Maximum safe temperature",
    },
    minSafeCurrentTemp: {
      type: ["number", "null"],
      description: "Minimum safe temperature",
    },
    currentHumidity: {
      type: "number",
      minimum: 0,
    },
    maxSafeCurrentHumidity: {
      type: ["number", "null"],
      description: "Maximum safe humidity",
    },
    minSafeCurrentHumidity: {
      type: ["number", "null"],
      description: "Minimum safe humidity",
    },
    hvacMode: {
      type: "string",
      enum: ["cool", "heat", "auto", "off"],
    },
    hvacState: {
      type: ["string", "null"],
      enum: ["cooling", "heating", "off", null],
    },
    fanMode: {
      type: "string",
      enum: ["auto", "low", "medium", "high", "off", "on"],
    },
    fanState: {
      type: ["string", "null"],
      enum: ["off", "low", "medium", "high", "on", null],
    },
    temperatureScale: {
      type: "string",
      enum: ["celsius", "fahrenheit"],
      default: "fahrenheit",
    },
    humidityScale: {
      type: ["string", "null"],
      enum: ["absolute", "relative", null],
    },
    supportedHvacModes: {
      type: "array",
      uniqueItems: true,
      minItems: 2,
      items: {
        type: "string",
        enum: ["cool", "heat", "auto", "off"],
      },
    },
    supportedFanModes: {
      type: "array",
      uniqueItems: true,
      items: {
        type: "string",
        enum: ["auto", "low", "medium", "high", "off", "on"],
      },
    },
    setpoints: {
      type: "object",
      additionalProperties: false,
      properties: {
        cool: {
          $ref: "#/definitions/setpoint",
        },
        heat: {
          $ref: "#/definitions/setpoint",
        },
        auto: {
          $ref: "#/definitions/setpoint",
        },
      },
    },
    minAutoDelta: {
      type: "number",
      default: 3,
    },
    cycleRate: {
      type: "number",
    },
    co2: {
      type: ["number", "null"],
      description: "Parts per million (ppm)",
    },
    voc: {
      type: ["number", "null"],
      description: "Parts per billion (ppb)",
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
    uiEnabled: {
      type: "boolean",
      description: "Local thermostat controls active or not",
      default: true,
    },
  },
  definitions: {
    setpoint: {
      type: "object",
      additionalProperties: false,
      required: ["value", "min", "max"],
      properties: {
        value: {
          type: "number",
          minimum: 0,
          maximum: 99,
        },
        min: {
          type: ["number", "null"],
          minimum: 0,
          maximum: 99,
        },
        max: {
          type: ["number", "null"],
          minimum: 0,
          maximum: 99,
        },
      },
    },
  },
} as const;

export type ThermostatSchema = FromSchema<
  typeof thermostatSchema,
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
