const Event = require("./Event");

class SystemLockUpdatedEvent extends Event {
  constructor(lock) {
    super(lock);
  }

  get name() {
    return "SystemLockUpdated";
  }

  get routingKey() {
    return `lock.${this.data.id}.updated`;
  }
}

module.exports = SystemLockUpdatedEvent;
