const driverEnums = [
  "aws-kinesis",
  "butler",
  "crestron",
  "dmp",
  "dormakaba",
  "dsc",
  "ecobee",
  "igor",
  "inncom",
  "kohost-k7",
  "kohost-pms",
  "lg",
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
  "twilio",
  "cloudflare-images",
  "cloudflare-stream",
  "insperia-privacy",
] as const;

const entityTypeEnums = [
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
  "announcement",
  "emailMessage",
  "smsMessage",
  "credential",
  "energyReport",
] as const;

const supportedNotificationsEnums = [
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
] as const;

const userRoles = [
  "Guest",
  "User",
  "Manager",
  "Administrator",
  "SuperAdmin",
] as const;

export const definitions = {
  $schema: "http://json-schema.org/draft-07/schema",
  $id: "definitions.json",
  title: "Definitions",
  definitions: {
    id: {
      type: "string",
      description: "Unique identifier of the entity.",
    },
    systemId: {
      type: "string",
      description: "Entity identifier known by the system or driver.",
    },
    systemData: {
      type: "object",
      description: "System-specific data.",
    },
    metadata: {
      type: "object",
      description: "Metadata of the entity.",
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
      enum: driverEnums,
    },
    type: {
      type: "string",
      enum: entityTypeEnums,
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
        enum: supportedNotificationsEnums,
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
    userRole: {
      type: "string",
      enum: userRoles,
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

export type Drivers = (typeof driverEnums)[number];
export type EntityTypes = (typeof entityTypeEnums)[number];
export type SupportedNotifications =
  (typeof supportedNotificationsEnums)[number];
export type UserRoles = (typeof userRoles)[number];

export type Definitions = {
  /** Unique identifier of the entity. */
  id: string;
  /** Entity identifier known by the system or driver. */
  systemId: string;
  /** System-specific data. */
  systemData: Record<string, unknown>;
  /** Metadata of the entity. */
  metadata: Record<string, unknown>;
  /** Date in ISO 8601 or a Date object */
  date: string | Date;
  /** Date in ISO 8601 or a Date object */
  createdAt: string | Date;
  /** Date in ISO 8601 or a Date object */
  updatedAt: string | Date;
  file: {
    name: string;
    type: string;
    data: string;
  };
  address: {
    id: string;
    line1: string;
    line2: string;
    line3: string;
    city: string;
    state: string;
    postalCode: string;
    countryCode: string;
  };
  driver: Drivers;
  type: EntityTypes;
  name: string;
  subType: string | null;
  supportedNotifications: SupportedNotifications[];
  notification: {
    name: SupportedNotifications;
    timestamp: number;
    description: string;
  } | null;
  batteryLevel: number;
  watts: number;
  userRole: UserRoles;
  revenue: {
    id: string;
    name: string;
    date: string;
    price: number;
    tax: number | null;
  }[];
};
