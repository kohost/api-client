const Event = require("./Event");

class SystemWindowCoveringUpdatedEvent extends Event {
  constructor(wc) {
    super(wc);
  }

  get name() {
    return "SystemWindowCoveringUpdated";
  }

  get routingKey() {
    return `windowCovering.${this.data.id}.updated`;
  }
}

module.exports = SystemWindowCoveringUpdatedEvent;
