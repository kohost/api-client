const Event = require("./Event");

class SystemSpaceUpdatedEvent extends Event {
  constructor(space) {
    super(space);
  }

  get name() {
    return "SystemSpaceUpdated";
  }

  get routingKey() {
    return `space.${this.keyId}.updated`;
  }
}

module.exports = SystemSpaceUpdatedEvent;
