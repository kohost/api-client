import Event from "./Event";

type MotionSensor = import("../types/MotionSensorSchema").MotionSensor;

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
