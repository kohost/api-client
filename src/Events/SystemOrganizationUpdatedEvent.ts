import Organization from "../Models/Organization";
import Event from "./Event";

class SystemOrganizationUpdatedEvent extends Event {
  constructor(organization: Organization) {
    super(organization);
  }

  get name() {
    return "SystemOrganizationUpdated";
  }

  get routingKey() {
    return `organization.${this.keyId}.updated`;
  }
}

export default SystemOrganizationUpdatedEvent;
