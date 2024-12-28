export default {
  $schema: "http://json-schema.org/draft-07/schema",
  $id: "definitions.json",
  title: "Definitions",
  definitions: {
    id: {
      type: "string",
      description: "Identifier of the object.",
      not: {
        enum: ["global", "system"],
      },
    },
    systemId: {
      type: "string",
      description: "Identifier of the object, directly related to the system.",
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
      description: "Driver used to communicate with the object.",
      enum: [
        "aws-kinesis",
        "butler",
        "crestron",
        "dell",
        "dmp",
        "doorbird",
        "dormakaba",
        "dsc",
        "ecobee",
        "epson",
        "geovision-rs",
        "geovision-as-manager",
        "honeywell-vista",
        "igor",
        "inncom",
        "isapi",
        "kohost-k7",
        "kohost",
        "lg",
        "lg-webos",
        "lapi",
        "lirc",
        "mews",
        "mht",
        "paxton",
        "pelican-wireless",
        "power-shades",
        "rachio",
        "rebrandly",
        "rtsp",
        "salto",
        "salto-irn",
        "samsung",
        "se",
        "sendgrid",
        "sonifi",
        "stay-n-touch",
        "storable",
        "twilio",
        "unifi",
        "valcom",
        "vizio",
        "wisenet",
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
};