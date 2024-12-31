import { Event } from "./event";

export class SystemMotionSensorUpdated extends Event {
  constructor(motion, context) {
    super(motion, context);
  }

  static get name() {
    return "SystemMotionSensorUpdated";
  }

  static get entity() {
    return "motionSensor";
  }
}
