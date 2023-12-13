import Event from "./Event";

type Camera = import("../types/CameraSchema").Camera;

class SystemCameraUpdatedEvent extends Event {
  constructor(camera: Camera) {
    super(camera);
  }

  get name() {
    return "SystemCameraUpdated";
  }

  get routingKey() {
    return `camera.${this.keyId}.updated`;
  }
}

export default SystemCameraUpdatedEvent;
