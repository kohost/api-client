import Event from "./event";

class SystemCameraUpdated extends Event {
  constructor(camera, context) {
    super(camera, context);
  }

  static get name() {
    return "SystemCameraUpdated";
  }

  static get entity() {
    return "camera";
  }
}

export default SystemCameraUpdated;
