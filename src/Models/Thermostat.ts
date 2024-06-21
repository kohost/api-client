import { FromSchema } from "json-schema-to-ts";

const defs = {
  $schema: "http://json-schema.org/draft-07/schema",
  $id: "definitions.json",
  title: "Definitions",
  definitions: {
    id: {
      type: "string",
      not: {
        enum: ["global", "system"],
      },
    },
    systemId: {
      type: "string",
    },
    systemData: {
      type: "object",
    },
    metadata: {
      type: "object",
      default: {},
    },
    date: {
      type: ["string", "object"],
      format: "date-time",
    },
    createdAt: {
      type: ["string", "object"],
      format: "date-time",
    },
    updatedAt: {
      type: ["string", "object"],
      format: "date-time",
    },
    file: {
      type: "object",
      required: ["name", "type", "data"],
      properties: {
        name: {
          type: "string",
          description: "Name of the file.",
        },
        type: {
          type: "string",
          description: "MIME type of the file (e.g. application/pdf).",
        },
        data: {
          type: "string",
          description: "Base64-encoded data of the file.",
        },
      },
    },
    address: {
      type: "object",
      properties: {
        id: {
          type: "string",
        },
        line1: {
          type: "string",
        },
        line2: {
          type: "string",
        },
        line3: {
          type: "string",
        },
        city: {
          type: "string",
        },
        state: {
          type: "string",
        },
        postalCode: {
          type: "string",
        },
        countryCode: {
          type: "string",
          minLength: 2,
          maxLength: 2,
        },
      },
    },
    driver: {
      type: "string",
      enum: [
        "aws-kinesis",
        "butler",
        "crestron",
        "dell",
        "dmp",
        "dormakaba",
        "dsc",
        "ecobee",
        "epson",
        "honeywell-vista",
        "igor",
        "inncom",
        "isapi",
        "kohost-k7",
        "kohost",
        "lg",
        "lapi",
        "lirc",
        "mews",
        "mht",
        "paxton",
        "pelican-wireless",
        "power-shades",
        "rebrandly",
        "salto",
        "salto-irn",
        "se",
        "sendgrid",
        "sonifi",
        "stay-n-touch",
        "storable",
        "twilio",
        "valcom",
        "vizio",
        "cloudflare-images",
        "cloudflare-stream",
        "insperia-privacy",
      ],
    },
    type: {
      type: "string",
      enum: [
        "alarm",
        "dimmer",
        "switch",
        "motionSensor",
        "windowCovering",
        "camera",
        "mediaSource",
        "thermostat",
        "lock",
        "courtesy",
        "gateway",
        "tv",
        "dvr",
        "appleTv",
        "discPlayer",
        "mediaPlayer",
        "uncontrolledDevice",
      ],
    },
    name: {
      type: "string",
    },
    subType: {
      type: ["string", "null"],
    },
    supportedNotifications: {
      type: "array",
      uniqueItems: true,
      items: {
        enum: [
          "button 1",
          "button 2",
          "button 3",
          "button 4",
          "button 5",
          "idle",
          "powerHasBeedApplied",
          "acMainsDisconnected",
          "acMainsReconnected",
          "replaceBatterySoon",
          "replaceBatteryNow",
          "batteryOk",
          "hardwareFailure",
          "softwareFailure",
          "hardwareFailureWithCode",
          "softwareFailureWithCode",
          "motionDetection",
          "airFilterNeedsCleaned",
          "airFilterNeedsReplaced",
          "smokeDetected",
          "outsideSafeTemperatureRange",
          "outsideSafeHumidityRange",
          "scheduleMaintenance",
          "doorAjar",
          "communicationFailure",
          "communicationOk",
          "burglarAlarm",
          "fireAlarm",
        ],
      },
    },
    notification: {
      type: ["object", "null"],
      properties: {
        name: {
          type: "string",
          $ref: "#/definitions/supportedNotifications/items",
        },
        timestamp: {
          type: "number",
          minimum: 1655907956593,
        },
        description: {
          type: "string",
        },
      },
    },
    batteryLevel: {
      type: "number",
      minimum: 0,
      maximum: 100,
    },
    watts: {
      type: "number",
      minimum: 0,
    },
    revenue: {
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
          date: {
            type: "string",
            format: "date-time",
          },
          price: {
            type: "number",
          },
          tax: {
            type: ["number", "null"],
          },
        },
      },
    },
  },
} as const;

export const thermostatSchema = {
  $schema: "http://json-schema.org/draft-07/schema",
  $id: "thermostat.json",
  title: "Thermostat",
  description: "Any smart thermostat",
  type: "object",
  properties: {
    id: {
      $ref: "definitions.json#/definitions/id",
    },
    name: {
      $ref: "definitions.json#/definitions/name",
    },
    type: {
      $ref: "definitions.json#/definitions/type",
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
      maximum: 99,
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
    batteryLevel: {
      $ref: "definitions.json#/definitions/batteryLevel",
    },
    systemId: {
      $ref: "definitions.json#/definitions/systemId",
    },
    watts: {
      $ref: "definitions.json#/definitions/watts",
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
} as const;

export type Thermostat = FromSchema<
  typeof thermostatSchema,
  { references: [typeof defs] }
>;

const tstat: Thermostat = {
  id: "123",
  name: "My Thermostat",
  setpoints: {
    cool: {
      max: 75,
      min: 65,
      value: 70,
    },
    heat: {
      max: 75,
      min: 65,
      value: 70,
    },
    auto: {
      min: 65,
      max: 75,
      value: 70,
    },
  },
};
