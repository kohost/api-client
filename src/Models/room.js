// create the Room model
const schemas = require("../utils/schema");
const schema = require("../schemas/room.json");
const deviceSchema = require("../schemas/definitions/device.json");
const Kohost = require("./kohost");
const cloneDeep = require("lodash.clonedeep");

// device dependencies
const Switch = require("./switch");
const Dimmer = require("./dimmer");
const Thermostat = require("./thermostat");
const Lock = require("./lock");
const WindowCovering = require("./windowCovering");
const Courtesy = require("./courtesy");
const Camera = require("./camera");
const Alarm = require("./alarm");
const MediaSource = require("./mediaSource");
const MotionSensor = require("./motionSensor");

// other dependencies
const Scene = require("./scene");

schemas.add(schema);
const validator = schemas.compile(schema);

class Room extends Kohost {
  constructor(data) {
    const roomData = mapRoomData(data);
    super(roomData);
  }

  static getDevicePath(type) {
    const validTypes = deviceSchema.definitions.type.enum;
    if (!validTypes.includes(type))
      throw new Error("Invalid device type:" + type);
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
  }

  static getDeviceTypeFromPath(path) {
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
  }

  get hasDimmer() {
    return this.dimmers?.length > 0;
  }

  get hasSwitch() {
    return this.switches?.length > 0;
  }

  get hasWindowCovering() {
    return this.windowCoverings?.length > 0;
  }

  get hasShade() {
    return this.hasWindowCovering;
  }

  get hasThermostat() {
    return this.thermostats?.length > 0;
  }

  get hasClimate() {
    return this.hasThermostat;
  }

  get hasLock() {
    return this.locks?.length > 0;
  }

  get hasCourtesy() {
    return this.courtesy?.length > 0;
  }

  get hasCamera() {
    return this.cameras?.length > 0;
  }

  get hasAlarm() {
    return this.alarms?.length > 0;
  }

  get hasMedia() {
    return this.mediaSources?.length > 0;
  }

  get hasLight() {
    const hasSubTypeLight = this.switches?.some((sw) => {
      return sw.subType === "light" || sw.subType === "fan";
    });
    return this.hasDimmer || hasSubTypeLight;
  }

  get occupied() {
    const now = new Date();
    const lastOccupied = new Date(this.occupiedAt);
    const diff = now - lastOccupied;
    // check if the room has been occupied in the last 60 minutes
    return diff < 60 * 60 * 1000;
  }
}

Object.defineProperty(Room.prototype, "schema", {
  value: schema,
});

Object.defineProperty(Room.prototype, "validator", {
  get: function () {
    return validator;
  },
});

Object.defineProperty(Room, "validProperties", {
  value: Object.keys(schema.properties),
});

function mapRoomData(data) {
  const roomData = cloneDeep(data);
  roomData.dimmers?.map((dimmer) => {
    if (dimmer instanceof Dimmer) return dimmer;
    else return new Dimmer(dimmer);
  });
  roomData.switches?.map((switch_) => {
    if (switch_ instanceof Switch) return switch_;
    else return new Switch(switch_);
  });

  roomData.windowCoverings?.map((windowCovering) => {
    if (windowCovering instanceof WindowCovering) return windowCovering;
    else return new WindowCovering(windowCovering);
  });

  roomData.thermostats?.map((thermostat) => {
    if (thermostat instanceof Thermostat) return thermostat;
    else return new Thermostat(thermostat);
  });

  roomData.locks?.map((lock) => {
    if (lock instanceof Lock) return lock;
    else return new Lock(lock);
  });

  roomData.courtesy?.map((courtesy) => {
    if (courtesy instanceof Courtesy) return courtesy;
    else return new Courtesy(courtesy);
  });

  roomData.mediaSources?.map((source) => {
    if (source instanceof MediaSource) return source;
    else return new MediaSource(source);
  });

  roomData.cameras?.map((camera) => {
    if (camera instanceof Camera) return camera;
    else return new Camera(camera);
  });

  roomData.alarms?.map((alarm) => {
    if (alarm instanceof Alarm) return alarm;
    else return new Alarm(alarm);
  });

  roomData.motionSensors?.map((motionSensor) => {
    if (motionSensor instanceof MotionSensor) return motionSensor;
    else return new MotionSensor(motionSensor);
  });

  roomData.scenes?.map((scene) => {
    if (scene instanceof Scene) return scene;
    else return new Scene(scene);
  });

  return roomData;
}

module.exports = Room;
