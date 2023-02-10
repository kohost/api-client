const Event = require("./Event");

class SystemCameraUpdatedEvent extends Event {
  constructor(camera) {
    super(camera);
  }

  get name() {
    return "SystemCameraUpdated";
  }

  get routingKey() {
    return `camera.${this.keyId}.updated`;
  }
}

module.exports = SystemCameraUpdatedEvent;
