import { CameraSchema } from "../Models/Camera";
import { Event } from "./Event";

export class SystemCameraUpdated extends Event {
  constructor(camera: CameraSchema, context = {}) {
    super(camera, context);
  }

  static get name() {
    return "SystemCameraUpdated";
  }

  get entity() {
    return "camera" as const;
  }
}

export default SystemCameraUpdated;
