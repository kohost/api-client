const Event = require("./Event");

class SystemUserUpdate extends Event {
  constructor(user, context) {
    super(user, context);
  }

  static get name() {
    return "SystemUserUpdated";
  }

  static get entity() {
    return "user";
  }
}

module.exports = SystemUserUpdate;
