import { type Definitions } from "./definitions.json";

const supportedStatesEnums = ["privacy", "service", "none"] as const;

export const schema = {
  $schema: "http://json-schema.org/draft-07/schema",
  $id: "courtesy.json",
  title: "Courtesy",
  description: "Any smart courtesy system",
  type: "object",
  properties: {
    id: {
      $ref: "definitions.json#/definitions/id",
    },
    name: {
      type: "string",
    },
    type: {
      $ref: "definitions.json#/definitions/type",
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
    supportedStates: {
      type: "array",
      uniqueItems: true,
      items: {
        enum: supportedStatesEnums,
      },
    },
    state: {
      type: "string",
      $ref: "#/properties/supportedStates/items",
    },
    systemId: {
      $ref: "definitions.json#/definitions/systemId",
    },
    watts: {
      $ref: "definitions.json#/definitions/watts",
    },
  },
  required: ["id", "type", "driver", "supportedStates", "state"],
} as const;

type CourtesySupportedStates = (typeof supportedStatesEnums)[number];

export interface CourtesySchema {
  id: Definitions["id"];
  name?: string;
  type: "courtesy";
  supportedNotifications?: Definitions["supportedNotifications"];
  notification?: Definitions["notification"];
  driver: Definitions["driver"];
  offline?: boolean;
  supportedStates: CourtesySupportedStates[];
  state: CourtesySupportedStates;
  systemId?: Definitions["systemId"];
  watts?: Definitions["watts"];
}
