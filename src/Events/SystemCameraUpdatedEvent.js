const Event = require("./Event");

class SystemCameraUpdatedEvent extends Event {
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

module.exports = SystemCameraUpdatedEvent;
