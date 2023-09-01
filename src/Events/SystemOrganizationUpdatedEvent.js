const Event = require("./Event");

class SystemOrganizationUpdatedEvent extends Event {
  constructor(organization) {
    super(organization);
  }

  get name() {
    return "SystemOrganizationUpdated";
  }

  get routingKey() {
    return `organization.${this.keyId}.updated`;
  }
}

module.exports = SystemOrganizationUpdatedEvent;
