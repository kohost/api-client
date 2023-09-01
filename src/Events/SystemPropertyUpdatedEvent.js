const Event = require("./Event");

class SystemPropertyUpdatedEvent extends Event {
  constructor(property) {
    super(property);
  }

  get name() {
    return "SystemPropertyUpdated";
  }

  get routingKey() {
    return `property.${this.keyId}.updated`;
  }
}

module.exports = SystemPropertyUpdatedEvent;
