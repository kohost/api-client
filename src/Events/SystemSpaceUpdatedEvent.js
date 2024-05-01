const Event = require("./Event");

class SystemSpaceUpdatedEvent extends Event {
  constructor(space, context) {
    super(space, context);
  }

  static get name() {
    return "SystemSpaceUpdated";
  }

  static get entity() {
    return "space";
  }
}

module.exports = SystemSpaceUpdatedEvent;
