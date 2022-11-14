const Event = require("./Event");

class SystemDimmerUpdatedEvent extends Event {
  constructor(dimmer) {
    super(dimmer);
  }

  get name() {
    return "SystemDimmerUpdated";
  }

  get routingKey() {
    return `dimmer.${this.data.id}.updated`;
  }
}

module.exports = SystemDimmerUpdatedEvent;
