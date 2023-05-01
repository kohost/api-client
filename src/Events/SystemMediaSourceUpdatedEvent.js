const Event = require("./Event");

class SystemMediaSourceUpdatedEvent extends Event {
<<<<<<< HEAD
  constructor(lock) {
    super(lock);
=======
  constructor(mediaSource) {
    super(mediaSource);
>>>>>>> master
  }

  get name() {
    return "SystemMediaSourceUpdated";
  }

  get routingKey() {
    return `mediaSource.${this.keyId}.updated`;
  }
}

module.exports = SystemMediaSourceUpdatedEvent;
