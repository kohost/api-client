const Event = require("./Event");

class SystemMediaSourceUpdatedEvent extends Event {
  constructor(lock) {
    super(lock);
  }

  get name() {
    return "SystemMediaSourceUpdated";
  }

  get routingKey() {
    return `mediaSource.${this.keyId}.updated`;
  }
}

module.exports = SystemMediaSourceUpdatedEvent;
