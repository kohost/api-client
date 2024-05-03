const Event = require("./Event");

class SystemEntityDeleted extends Event {
  constructor(data, context) {
    super(data, context);
  }

  static get name() {
    return "SystemEntityDeleted";
  }

  static get entity() {
    return "entity";
  }
}

module.exports = SystemEntityDeleted;
