const Event = require("./Event");

class SystemCourtesyUpdatedEvent extends Event {
  constructor(courtesy) {
    super(courtesy);
  }

  get name() {
    return "SystemCourtesyUpdated";
  }

  get routingKey() {
    return `courtesy.${this.keyId}.updated`;
  }
}

module.exports = SystemCourtesyUpdatedEvent;
