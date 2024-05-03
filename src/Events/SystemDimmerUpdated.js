const Event = require("./Event");

class SystemDimmerUpdated extends Event {
  constructor(dimmer, context) {
    super(dimmer, context);
  }

  static get name() {
    return "SystemDimmerUpdated";
  }

  static get entity() {
    return "dimmer";
  }
}

module.exports = SystemDimmerUpdated;
