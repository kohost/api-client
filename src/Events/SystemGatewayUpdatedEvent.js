const Event = require("./Event");

class SystemGatewayUpdatedEvent extends Event {
  constructor(gateway, context) {
    super(gateway, context);
  }

  static get name() {
    return "SystemGatewayUpdated";
  }

  static get entity() {
    return "gateway";
  }
}

module.exports = SystemGatewayUpdatedEvent;
