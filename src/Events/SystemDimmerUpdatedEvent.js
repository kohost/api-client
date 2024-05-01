const Event = require("./Event");

class SystemDimmerUpdatedEvent extends Event {
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

module.exports = SystemDimmerUpdatedEvent;
