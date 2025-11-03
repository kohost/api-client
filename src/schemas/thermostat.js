export default {
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
    currentHumidity: {
      type: "number",
      minimum: 0,
    },
    hvacMode: {
      type: "string",
      $ref: "#/properties/supportedHvacModes/items",
    },
    hvacState: {
      type: ["string", "null"],
      enum: ["cooling", "heating", "off", null],
    },
    fanMode: {
      type: "string",
      $ref: "#/properties/supportedFanModes/items",
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
        enum: ["cool", "heat", "auto", "off"],
      },
    },
    supportedFanModes: {
      type: "array",
      uniqueItems: true,
      items: {
        enum: ["auto", "low", "medium", "high", "off", "on"],
      },
    },
    setpoints: {
      type: "object",
      additionalProperties: false,
      properties: {
        cool: {
          $ref: "#/$defs/setpoint",
        },
        heat: {
          $ref: "#/$defs/setpoint",
        },
        auto: {
          $ref: "#/$defs/setpoint",
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
      type: "number",
      description: "Parts per million (ppm)",
    },
    voc: {
      type: "number",
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
  $defs: {
    setpoint: {
      type: "object",
      additionalProperties: false,
      properties: {
        value: {
          $ref: "#/$defs/setpointValue",
        },
        min: {
          $ref: "#/$defs/setpointMinMax",
        },
        max: {
          $ref: "#/$defs/setpointMinMax",
        },
      },
    },
    setpointValue: {
      type: "number",
      minimum: 0,
      maximum: 99,
    },
    setpointMinMax: {
      type: ["number", "null"],
      minimum: 0,
      maximum: 99,
    },
  },
};
