const Event = require("./Event");

class SystemLockUpdatedEvent extends Event {
  constructor(lock) {
    super(lock);
  }

  get name() {
    return "SystemLockUpdated";
  }

  get routingKey() {
    return `lock.${this.keyId}.updated`;
  }
}

module.exports = SystemLockUpdatedEvent;
