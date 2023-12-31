import { type DimmerSchema } from "./dimmer.json";
import { type SwitchSchema } from "./switch.json";
import { type ThermostatSchema } from "./thermostat.json";
import { type LockSchema } from "./lock.json";
import { type WindowCoveringSchema } from "./windowCovering.json";
import { type CourtesySchema } from "./courtesy.json";
import { type CameraSchema } from "./camera.json";
import { type MediaSourceSchema } from "./mediaSource.json";
import { type MotionSensorSchema } from "./motionSensor.json";
import { type AlarmSchema } from "./alarm.json";
import { type Definitions } from "./definitions.json";

export const schema = {
  $schema: "http://json-schema.org/draft-07/schema",
  $id: "room.json",
  title: "Room",
  description: "A room represents a physical space of controllable IoT devices",
  type: "object",
  properties: {
    id: {
      $ref: "definitions.json#/definitions/id",
    },
    name: {
      type: "string",
    },
    floor: {
      type: "string",
    },
    dimmers: {
      type: "array",
      default: [],
      items: {
        $ref: "dimmer.json",
      },
    },
    switches: {
      type: "array",
      default: [],

      items: {
        $ref: "switch.json",
      },
    },
    thermostats: {
      type: "array",
      default: [],

      items: {
        $ref: "thermostat.json",
      },
    },
    locks: {
      type: "array",
      default: [],

      items: {
        $ref: "lock.json",
      },
    },
    windowCoverings: {
      type: "array",
      default: [],

      items: {
        $ref: "windowCovering.json",
      },
    },
    courtesy: {
      type: "array",
      default: [],

      items: {
        $ref: "courtesy.json",
      },
    },
    cameras: {
      type: "array",
      default: [],

      items: {
        $ref: "camera.json",
      },
    },
    mediaSources: {
      type: "array",
      default: [],

      items: {
        $ref: "mediaSource.json",
      },
    },
    motionSensors: {
      type: "array",
      default: [],

      items: {
        $ref: "motionSensor.json",
      },
    },
    alarms: {
      type: "array",
      default: [],

      items: {
        $ref: "alarm.json",
      },
    },
    occupiedAt: {
      $ref: "definitions.json#/definitions/date",
    },
    createdAt: {
      $ref: "definitions.json#/definitions/date",
    },
    updatedAt: {
      $ref: "definitions.json#/definitions/date",
    },
  },
  additionalProperties: false,
} as const;

export interface RoomSchema {
  id: Definitions["id"];
  name?: string;
  floor?: string;
  dimmers?: DimmerSchema[];
  switches?: SwitchSchema[];
  thermostats?: ThermostatSchema[];
  locks?: LockSchema[];
  windowCoverings?: WindowCoveringSchema[];
  courtesy?: CourtesySchema[];
  cameras?: CameraSchema[];
  mediaSources?: MediaSourceSchema[];
  motionSensors?: MotionSensorSchema[];
  alarms?: AlarmSchema[];
  occupiedAt?: Definitions["date"];
  createdAt?: Definitions["date"];
  updatedAt?: Definitions["date"];
}
