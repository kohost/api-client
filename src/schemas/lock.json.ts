import { type Definitions } from "./definitions.json";

const lockStates = ["locked", "unlocked"] as const;
const lockModes = ["normal", "autoLock"] as const;

export const schema = {
  $schema: "http://json-schema.org/draft-07/schema",
  $id: "lock.json",
  title: "Lock",
  description: "Any smart lock",
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
    offline: {
      type: "boolean",
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
    state: {
      type: ["string", "null"],
      enum: lockStates,
    },
    mode: {
      type: ["string", "null"],
      enum: lockModes,
      description:
        "AutoLock: Lock automatically locks after set time. Normal - Lock needs told to lock or unlock.",
      default: "normal",
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
  required: ["id", "type", "state", "driver"],
} as const;

type LockStates = (typeof lockStates)[number];
type LockModes = (typeof lockModes)[number];

export interface LockSchema {
  id: Definitions["id"];
  name?: string;
  type: "lock";
  offline?: boolean;
  supportedNotifications?: Definitions["supportedNotifications"];
  notification?: Definitions["notification"];
  driver: Definitions["driver"];
  state: LockStates | null;
  mode: LockModes | null;
  batteryLevel?: Definitions["batteryLevel"];
  systemId?: Definitions["systemId"];
  watts?: Definitions["watts"];
}
