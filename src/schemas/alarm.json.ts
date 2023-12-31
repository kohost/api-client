import { type Definitions } from "./definitions.json";

const securityModeEnums = [
  "arming",
  "disarming",
  "armed",
  "disarmed",
  "alarm",
] as const;

export const schema = {
  $schema: "http://json-schema.org/draft-07/schema",
  $id: "alarm.json",
  title: "Alarm",
  description: "Any smart alarm system",
  type: "object",
  properties: {
    id: {
      $ref: "definitions.json#/definitions/id",
    },
    name: {
      type: "string",
    },
    offline: {
      type: "boolean",
    },
    type: {
      $ref: "definitions.json#/definitions/type",
      default: "alarm",
    },
    systemId: {
      $ref: "definitions.json#/definitions/systemId",
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
    areas: {
      type: "array",
      properties: {},
      items: {
        type: "object",
        properties: {
          number: {
            type: "number",
          },
          name: {
            type: "string",
          },
          securityMode: {
            type: ["string", "null"],
            enum: securityModeEnums,
          },
        },
      },
    },
    zones: {
      type: "array",
      properties: {},
      items: {
        type: "object",
        properties: {
          number: {
            type: "number",
            minimum: 0,
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
        },
      },
    },
    watts: {
      $ref: "definitions.json#/definitions/watts",
    },
    address: {
      $ref: "definitions.json#/definitions/address",
    },
  },
  required: ["id", "type", "areas", "zones", "driver"],
} as const;

type AlarmSecurityMode = (typeof securityModeEnums)[number];

export interface AlarmSchema {
  id: Definitions["id"];
  name?: string;
  offline?: boolean;
  type: "alarm";
  systemId?: Definitions["systemId"];
  supportedNotifications?: Definitions["supportedNotifications"];
  notification?: Definitions["notification"];
  driver: Definitions["driver"];
  areas: {
    number: number;
    name: string;
    securityMode: AlarmSecurityMode;
  }[];
  zones: {
    number: number;
    name: string;
    secure: boolean | null;
    bypassed: boolean | null;
  }[];
  watts?: Definitions["watts"];
  address?: Definitions["address"];
}
