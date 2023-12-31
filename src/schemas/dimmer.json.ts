import { Definitions } from "./definitions.json";

export const schema = {
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
      $ref: "definitions.json#/definitions/type",
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
  },
  required: ["id", "type", "level", "driver"],
} as const;

export interface DimmerSchema {
  id: Definitions["id"];
  name?: string;
  type: "dimmer";
  supportedNotifications?: Definitions["supportedNotifications"];
  notification?: Definitions["notification"];
  driver: Definitions["driver"];
  offline?: boolean;
  level: number | null;
  systemId?: Definitions["systemId"];
  watts?: Definitions["watts"];
}
