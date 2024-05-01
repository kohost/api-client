const Event = require("./Event");

class SystemLockUpdatedEvent extends Event {
  constructor(lock, context) {
    super(lock, context);
  }

  static get name() {
    return "SystemLockUpdated";
  }

  static get entity() {
    return "lock";
  }
}

module.exports = SystemLockUpdatedEvent;
