const Event = require("./Event");

class SystemProductUpdated extends Event {
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

module.exports = SystemProductUpdated;
