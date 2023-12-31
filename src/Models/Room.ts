// create the Room model
import { registerSchema, compileSchema } from "../utils/schema";
import { schema, type RoomSchema } from "../schemas/room.json";
import { definitions, type Definitions } from "../schemas/definitions.json";
import { type SwitchSchema } from "../schemas/switch.json";
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

registerSchema(schema);

interface Room extends RoomSchema {}

class Room extends Entity {
  constructor(room: RoomSchema) {
    const roomData = mapRoomData(room);
    super(roomData);
  }

  static getDevicePath(type: Definitions["type"]) {
    const validTypes = definitions.definitions.type.enum;
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

  get hasDimmer(): boolean {
    if (!this.dimmers) return false;
    return this.dimmers.length > 0;
  }

  get hasSwitch(): boolean {
    if (!this.switches) return false;
    return this.switches.length > 0;
  }

  get hasWindowCovering(): boolean {
    if (!this.windowCoverings) return false;
    return this.windowCoverings.length > 0;
  }

  get hasShade(): boolean {
    return this.hasWindowCovering;
  }

  get hasThermostat(): boolean {
    if (!this.thermostats) return false;
    return this.thermostats.length > 0;
  }

  get hasClimate(): boolean {
    return this.hasThermostat;
  }

  get hasLock(): boolean {
    if (!this.locks) return false;
    return this.locks.length > 0;
  }

  get hasCourtesy(): boolean {
    if (!this.courtesy) return false;
    return this.courtesy.length > 0;
  }

  get hasCamera(): boolean {
    if (!this.cameras) return false;
    return this.cameras.length > 0;
  }

  get hasAlarm(): boolean {
    if (!this.alarms) return false;
    return this.alarms?.length > 0;
  }

  get hasMedia(): boolean {
    if (!this.mediaSources) return false;
    return this.mediaSources.length > 0;
  }

  get hasLight(): boolean {
    const hasSubTypeLight = this.switches
      ? this.switches.some((sw: Switch | SwitchSchema) => {
          return sw.subType === "light" || sw.subType === "fan";
        })
      : false;
    return this.hasDimmer || hasSubTypeLight;
  }

  get occupied() {
    if (typeof this.occupiedAt === "undefined") return false;
    const now = new Date().getTime();
    const lastOccupied = new Date(this.occupiedAt).getTime();
    const diff = now - lastOccupied;
    // check if the room has been occupied in the last 60 minutes
    return diff < 60 * 60 * 1000;
  }
}

function mapRoomData(data: RoomSchema) {
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

Room.validator = compileSchema(schema);
Room.schema = schema;
Room.validProperties = Object.keys(schema.properties);

export default Room;
