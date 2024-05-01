const Event = require("./Event");

class SystemPropertyUpdatedEvent extends Event {
  constructor(property, context) {
    super(property, context);
  }

  static get name() {
    return "SystemPropertyUpdated";
  }

  static get entity() {
    return "property";
  }
}

module.exports = SystemPropertyUpdatedEvent;
