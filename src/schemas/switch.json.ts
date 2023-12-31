import { type Definitions } from "./definitions.json";

const switchState = ["on", "off"] as const;

export const schema = {
  $schema: "http://json-schema.org/draft-07/schema",
  $id: "switch.json",
  title: "Switch",
  description: "Any smart switch",
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
    subType: {
      $ref: "definitions.json#/definitions/subType",
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
    state: {
      type: "string",
      enum: switchState,
    },
    systemId: {
      $ref: "definitions.json#/definitions/systemId",
    },
    watts: {
      $ref: "definitions.json#/definitions/watts",
    },
  },
  required: ["id", "type", "state", "driver"],
};

type SwitchState = (typeof switchState)[number];

export interface SwitchSchema {
  id: Definitions["id"];
  name?: string;
  type: "switch";
  subType?: Definitions["subType"];
  supportedNotifications?: Definitions["supportedNotifications"];
  notification?: Definitions["notification"];
  driver: Definitions["driver"];
  offline?: boolean;
  state: SwitchState;
  systemId?: Definitions["systemId"];
  watts?: Definitions["watts"];
}
