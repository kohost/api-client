// create the Room model
import { add, compile } from "../utils/schema";
import schema, { properties } from "../schemas/room.json";
import { definitions } from "../schemas/definitions.json";
import Entity from "./Entity";

// device dependencies
import Switch from "./Switch";
import Dimmer from "./Dimmer";
import Thermostat from "./Thermostat";
import Lock from "./Lock";
import WindowCovering from "./WindowCovering";
import Courtesy from "./Courtesy";
import Camera from "./Camera";
import Alarm from "./Alarm";
import MediaSource from "./MediaSource";
import MotionSensor from "./MotionSensor";

add(schema);
const validator = compile(schema);

type RoomType = import("../types/RoomSchema").Room;

class Room extends Entity {
  constructor(room: RoomType) {
    const roomData = mapRoomData(room);
    super(roomData);
  }

  schema = schema;
  validator = validator;
  validProperties = Object.keys(properties);

  static getDevicePath(type: string) {
    const validTypes = definitions.type.enum;
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

  static getDeviceTypeFromPath(path: string) {
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
    const hasSubTypeLight = this.switches?.some((sw: Switch) => {
      return sw.subType === "light" || sw.subType === "fan";
    });
    return this.hasDimmer || hasSubTypeLight;
  }

  get occupied() {
    const now = new Date().getTime();
    const lastOccupied = new Date(this.occupiedAt).getTime();
    const diff = now - lastOccupied;
    // check if the room has been occupied in the last 60 minutes
    return diff < 60 * 60 * 1000;
  }
}

function mapRoomData(data: RoomType) {
  const roomData = structuredClone(data);
  roomData.dimmers?.map((dimmer: any) => {
    return new Dimmer(dimmer);
  });
  roomData.switches?.map((switch_: any) => {
    return new Switch(switch_);
  });

  roomData.windowCoverings?.map((windowCovering: any) => {
    return new WindowCovering(windowCovering);
  });

  roomData.thermostats?.map((thermostat: any) => {
    return new Thermostat(thermostat);
  });

  roomData.locks?.map((lock: any) => {
    return new Lock(lock);
  });

  roomData.courtesy?.map((courtesy: any) => {
    return new Courtesy(courtesy);
  });

  roomData.mediaSources?.map((source: any) => {
    return new MediaSource(source);
  });

  roomData.cameras?.map((camera: any) => {
    return new Camera(camera);
  });

  roomData.alarms?.map((alarm: any) => {
    return new Alarm(alarm);
  });

  roomData.motionSensors?.map((motionSensor: any) => {
    return new MotionSensor(motionSensor);
  });

  return roomData;
}

export default Room;
