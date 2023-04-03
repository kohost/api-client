const Event = require("./Event");

class SystemGatewayUpdatedEvent extends Event {
  constructor(space) {
    super(space);
  }

  get name() {
    return "SystemGatewayUpdated";
  }

  get routingKey() {
    return `gateway.${this.keyId}.updated`;
  }
}

module.exports = SystemGatewayUpdatedEvent;
