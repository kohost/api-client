import defs, { ISODateString } from "./definitions";
import type { FromSchema } from "json-schema-to-ts";
import type { dimmerSchema } from "./dimmer";
import type { switchSchema } from "./switch";
import type { thermostatSchema } from "./thermostat";
import type { lockSchema } from "./lock";
import type { windowCoveringSchema } from "./windowCovering";
import type { courtesySchema } from "./courtesy";
import type { cameraSchema } from "./camera";
import type { mediaSourceSchema } from "./mediaSource";
import type { motionSensorSchema } from "./motionSensor";
import type { alarmSchema } from "./alarm";

export const roomSchema = {
  $schema: "http://json-schema.org/draft-07/schema",
  $id: "room.json",
  title: "Room",
  description: "A room represents a physical space of controllable IoT devices",
  type: "object",
  required: [
    "id",
    "name",
    "dimmers",
    "thermostats",
    "switches",
    "windowCoverings",
    "courtesy",
    "cameras",
    "mediaSources",
    "motionSensors",
    "alarms",
  ],
  properties: {
    id: {
      $ref: "definitions.json#/definitions/id",
    },
    type: {
      type: "string",
      enum: ["room"],
      default: "room",
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
    deletedAt: {
      $ref: "definitions.json#/definitions/date",
    },
  },
  additionalProperties: false,
} as const;

export type RoomSchema = FromSchema<
  typeof roomSchema,
  {
    references: [
      typeof defs,
      typeof dimmerSchema,
      typeof switchSchema,
      typeof thermostatSchema,
      typeof lockSchema,
      typeof windowCoveringSchema,
      typeof courtesySchema,
      typeof cameraSchema,
      typeof mediaSourceSchema,
      typeof motionSensorSchema,
      typeof alarmSchema,
    ];
    deserialize: [
      {
        pattern: {
          format: "date-time";
        };
        output: Date | ISODateString;
      },
    ];
  }
>;

type RoomThermostat = RoomSchema["thermostats"];

export const getters = {
  /**
   * Check if the room has any dimmers
   * @returns {boolean} True if the room has dimmers, false otherwise
   */
  hasDimmer() {
    return this.dimmers?.length > 0;
  },

  /**
   * Check if the room has any switches
   * @returns {boolean} True if the room has switches, false otherwise
   */
  hasSwitch() {
    return this.switches?.length > 0;
  },

  /**
   * Check if the room has any window coverings
   * @returns {boolean} True if the room has window coverings, false otherwise
   */
  hasWindowCovering() {
    return this.windowCoverings?.length > 0;
  },

  /**
   * Alias for hasWindowCovering
   * @returns {boolean} True if the room has window coverings/shades, false otherwise
   */
  hasShade() {
    return this.hasWindowCovering;
  },

  /**
   * Check if the room has any thermostats
   * @returns {boolean} True if the room has thermostats, false otherwise
   */
  hasThermostat() {
    return this.thermostats?.length > 0;
  },

  /**
   * Alias for hasThermostat
   * @returns {boolean} True if the room has climate control, false otherwise
   */
  hasClimate() {
    return this.hasThermostat;
  },

  /**
   * Check if the room has any locks
   * @returns {boolean} True if the room has locks, false otherwise
   */
  hasLock() {
    return this.locks?.length > 0;
  },

  /**
   * Check if the room has any courtesy devices
   * @returns {boolean} True if the room has courtesy devices, false otherwise
   */
  hasCourtesy() {
    return this.courtesy?.length > 0;
  },

  /**
   * Check if the room has any cameras
   * @returns {boolean} True if the room has cameras, false otherwise
   */
  hasCamera() {
    return this.cameras?.length > 0;
  },

  /**
   * Check if the room has any media sources
   * @returns {boolean} True if the room has media sources, false otherwise
   */
  hasMedia() {
    return this.mediaSources?.length > 0;
  },

  /**
   * Check if the room has any lighting devices (dimmers or switches marked as lights/fans)
   * @returns {boolean} True if the room has lighting devices, false otherwise
   */
  hasLight() {
    const hasDiscriminatorLight = this.switches?.some(
      (sw: { discriminator?: string }) => {
        return sw.discriminator === "light" || sw.discriminator === "fan";
      }
    );
    return this.hasDimmer || hasDiscriminatorLight;
  },

  hasAlarm() {
    return this.alarms?.length > 0;
  },

  /**
   * Check if the room is currently occupied (within the last 60 minutes)
   * @returns {boolean} True if the room was occupied within the last hour, false otherwise
   */
  occupied() {
    if (!this.occupiedAt) return false;
    const now = new Date();
    const lastOccupied = new Date(this.occupiedAt as string | Date);
    const diff = now.getTime() - lastOccupied.getTime();
    return diff < 60 * 60 * 1000;
  },
};

export const statics = {
  /**
   * Get the device path for a given device type
   * @param {string} type - The device type
   * @returns {"mediaSources" | "courtesy" | "dimmers" | "thermostats" | "locks" | "windowCoverings" | "switches" | "cameras" | "motionSensors" | "alarms"} The device path
   * @throws {Error} If the device type is invalid
   */
  getDevicePath(type) {
    switch (type) {
      case "tv":
      case "dvr":
      case "appleTv":
      case "discPlayer":
      case "mediaPlayer":
      case "uncontrolledDevice":
      case "mediaSource":
        return "mediaSources";
      case "courtesy":
        return "courtesy";
      case "switch":
        return "switches";
      case "dimmer":
        return "dimmers";
      case "thermostat":
        return "thermostats";
      case "lock":
        return "locks";
      case "windowCovering":
        return "windowCoverings";
      case "camera":
        return "cameras";
      case "motionSensor":
        return "motionSensors";
      case "alarm":
        return "alarms";

      default:
        throw new Error("Invalid device type:" + type);
    }
  },
  /**
   *
   * @param {string} path
   * @returns
   */
  getDeviceTypeFromPath(path) {
    const validPaths = [
      "dimmers",
      "switches",
      "thermostats",
      "locks",
      "windowCoverings",
      "courtesy",
      "cameras",
      "mediaSources",
      "motionSensors",
      "alarms",
    ];
    if (!validPaths.includes(path))
      throw new Error("Invalid device path:" + path);
    switch (path) {
      case "courtesy":
        return path;
      case "switches":
        return "switch";
      default:
        return path.slice(0, -1);
    }
  },
};
