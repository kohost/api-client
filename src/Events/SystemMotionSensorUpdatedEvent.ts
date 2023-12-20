import MotionSensor from "../Models/MotionSensor";
import Event from "./Event";

class SystemMotionSensorUpdatedEvent extends Event {
  constructor(motionSensor: MotionSensor) {
    super(motionSensor);
  }

  get name() {
    return "SystemMotionSensorUpdated";
  }

  get routingKey() {
    return `mediaSource.${this.keyId}.updated`;
  }
}

export default SystemMotionSensorUpdatedEvent;
