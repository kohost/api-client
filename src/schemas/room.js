export default {
  $schema: "http://json-schema.org/draft-07/schema",
  $id: "room.json",
  title: "Room",
  description: "A room represents a physical space of controllable IoT devices",
  type: "object",
  required: ["id", "name"],
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
      $ref: "definitions.json#/definitions/createdAt",
    },
    createdAt: {
      $ref: "definitions.json#/definitions/createdAt",
    },
    updatedAt: {
      $ref: "definitions.json#/definitions/updatedAt",
    },
  },
  additionalProperties: false,
};

export const getters = {
  hasDimmer() {
    return this.dimmers?.length > 0;
  },
  hasSwitch() {
    return this.switches?.length > 0;
  },
  hasWindowCovering() {
    return this.windowCoverings?.length > 0;
  },
  hasShade() {
    return this.hasWindowCovering;
  },
  hasThermostat() {
    return this.thermostats?.length > 0;
  },
  hasClimate() {
    return this.hasThermostat;
  },
  hasLock() {
    return this.locks?.length > 0;
  },
  hasCourtesy() {
    return this.courtesy?.length > 0;
  },
  hasCamera() {
    return this.cameras?.length > 0;
  },
  hasMedia() {
    return this.mediaSources?.length > 0;
  },
  hasLight() {
    const hasDiscriminatorLight = this.switches?.some((sw) => {
      return sw.discriminator === "light" || sw.discriminator === "fan";
    });
    return this.hasDimmer || hasDiscriminatorLight;
  },
  occupied() {
    const now = new Date();
    const lastOccupied = new Date(this.occupiedAt);
    const diff = now - lastOccupied;
    // check if the room has been occupied in the last 60 minutes
    return diff < 60 * 60 * 1000;
  },
};

export const statics = {
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
        return type;
      case "switch":
        return "switches";
      default:
        return `${type}s`;
    }
  },
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
