const Event = require("./Event");

class SystemSpaceTypeUpdatedEvent extends Event {
  constructor(space) {
    super(space);
  }

  get name() {
    return "SystemSpaceTypeUpdated";
  }

  get routingKey() {
    return `spaceType.${this.keyId}.updated`;
  }
}

module.exports = SystemSpaceTypeUpdatedEvent;
