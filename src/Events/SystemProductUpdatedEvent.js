const Event = require("./Event");

class SystemProductUpdatedEvent extends Event {
  constructor(product, context) {
    super(product, context);
  }

  static get name() {
    return "SystemProductUpdated";
  }

  static get entity() {
    return "product";
  }
}

module.exports = SystemProductUpdatedEvent;
