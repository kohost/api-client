const Event = require("./Event");

class UpdateIntegrationEvent extends Event {
  constructor(integration) {
    super(integration);
  }

  get name() {
    return "UpdateIntegration";
  }

  get exchange() {
    return "Integrations";
  }

  get routingKey() {
    return `integration.${this.id}.updated`;
  }
}

module.exports = UpdateIntegrationEvent;
