const Event = require("./Event");

class SystemOrganizationUpdatedEvent extends Event {
  constructor(organization, context) {
    super(organization, context);
  }

  static get name() {
    return "SystemOrganizationUpdated";
  }

  static get entity() {
    return "organization";
  }
}

module.exports = SystemOrganizationUpdatedEvent;
