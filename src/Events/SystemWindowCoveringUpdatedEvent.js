const Event = require("./Event");

class SystemWindowCoveringUpdatedEvent extends Event {
  constructor(wc) {
    super(wc);
  }

  get name() {
    return "SystemWindowCoveringUpdated";
  }

  get routingKey() {
    return `windowCovering.${this.keyId}.updated`;
  }
}

module.exports = SystemWindowCoveringUpdatedEvent;
