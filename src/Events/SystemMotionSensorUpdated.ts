import { MotionSensorSchema } from "../Models/MotionSensor";
import { Event } from "./Event";

class SystemMotionSensorUpdated extends Event {
  constructor(motion: MotionSensorSchema, context = {}) {
    super(motion, context);
  }

  static get name() {
    return "SystemMotionSensorUpdated";
  }

  get entity() {
    return "motionSensor" as const;
  }
}

export default SystemMotionSensorUpdated;
