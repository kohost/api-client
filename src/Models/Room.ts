import { FromSchema } from "json-schema-to-ts";
import { DeviceType, deviceTypes } from "../defs/defs";
import { definitionsSchema } from "../schemas/definitions";
import { createValidator, registerSchema } from "../utils/validation";
import { roomSchema } from "./../schemas/room";
import { Alarm, AlarmSchema } from "./Alarm";
import { Camera, CameraSchema } from "./Camera";
import { Courtesy, CourtesySchema } from "./Courtesy";
import { Dimmer, DimmerSchema } from "./Dimmer";
import { Entity } from "./Entity";
import { Lock, LockSchema } from "./Lock";
import { MediaSource, MediaSourceSchema } from "./MediaSource";
import { MotionSensor, MotionSensorSchema } from "./MotionSensor";
import { Scene, SceneSchema } from "./Scene";
import { Switch, SwitchSchema } from "./Switch";
import { Thermostat, ThermostatSchema } from "./Thermostat";
import { WindowCovering, WindowCoveringSchema } from "./WindowCovering";

registerSchema(roomSchema);
const validator = createValidator(roomSchema);

export type RoomSchema = FromSchema<
  typeof roomSchema,
  { references: [typeof definitionsSchema] }
>;

export class Room extends Entity<RoomSchema> {
  static schema = roomSchema;
  validator = validator;

  constructor(data: RoomSchema) {
    super(createDeviceInstances(data));
  }

  static getDevicePath(type: DeviceType) {
    const validTypes = deviceTypes;
    if (!validTypes.includes(type))
      throw new Error("Invalid device type:" + type);
    switch (type) {
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
      return sw.subType === "light";
    });
    return this.hasDimmer || hasSubTypeLight;
  }

  get occupied() {
    if (
      typeof this.occupiedAt === "string" ||
      this.occupiedAt instanceof Date
    ) {
      const lastOccupied: Date =
        typeof this.occupiedAt === "string"
          ? new Date(this.occupiedAt)
          : (this.occupiedAt as Date);
      const now: Date = new Date();
      const diff = now.getTime() - lastOccupied.getTime();
      // check if the room has been occupied in the last 60 minutes
      return diff < 60 * 60 * 1000;
    }
    return false;
  }
}

function createDeviceInstances(data: any) {
  const roomData = structuredClone(data);
  roomData.dimmers?.map((dimmer: DimmerSchema | Dimmer) => {
    if (dimmer instanceof Dimmer) return dimmer;
    else return new Dimmer(dimmer);
  });
  roomData.switches?.map((switch_: SwitchSchema | Switch) => {
    if (switch_ instanceof Switch) return switch_;
    else return new Switch(switch_);
  });

  roomData.windowCoverings?.map(
    (windowCovering: WindowCoveringSchema | WindowCovering) => {
      if (windowCovering instanceof WindowCovering) return windowCovering;
      else return new WindowCovering(windowCovering);
    }
  );

  roomData.thermostats?.map((thermostat: ThermostatSchema | Thermostat) => {
    if (thermostat instanceof Thermostat) return thermostat;
    else return new Thermostat(thermostat);
  });

  roomData.locks?.map((lock: LockSchema | Lock) => {
    if (lock instanceof Lock) return lock;
    else return new Lock(lock);
  });

  roomData.courtesy?.map((courtesy: CourtesySchema | Courtesy) => {
    if (courtesy instanceof Courtesy) return courtesy;
    else return new Courtesy(courtesy);
  });

  roomData.mediaSources?.map((source: MediaSourceSchema | MediaSource) => {
    if (source instanceof MediaSource) return source;
    else return new MediaSource(source);
  });

  roomData.cameras?.map((camera: CameraSchema | Camera) => {
    if (camera instanceof Camera) return camera;
    else return new Camera(camera);
  });

  roomData.alarms?.map((alarm: AlarmSchema | Alarm) => {
    if (alarm instanceof Alarm) return alarm;
    else return new Alarm(alarm);
  });

  roomData.motionSensors?.map(
    (motionSensor: MotionSensorSchema | MotionSensor) => {
      if (motionSensor instanceof MotionSensor) return motionSensor;
      else return new MotionSensor(motionSensor);
    }
  );

  roomData.scenes?.map((scene: SceneSchema | Scene) => {
    if (scene instanceof Scene) return scene;
    else return new Scene(scene);
  });

  return roomData;
}

export default Room;
