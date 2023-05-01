const Event = require("./Event");

class SystemMotionSensorUpdatedEvent extends Event {
  constructor(mediaSource) {
    super(mediaSource);
  }

  get name() {
    return "SystemMotionSensorUpdated";
  }

  get routingKey() {
    return `mediaSource.${this.keyId}.updated`;
  }
}

module.exports = SystemMotionSensorUpdatedEvent;
