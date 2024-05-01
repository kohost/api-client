const Event = require("./Event");

class SystemLockUpdated extends Event {
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

module.exports = SystemLockUpdated;
