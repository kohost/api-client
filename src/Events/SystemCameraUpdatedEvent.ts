import Camera from "../Models/Camera";
import Event from "./Event";

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
