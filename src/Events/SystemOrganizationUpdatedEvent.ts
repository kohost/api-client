import Event from "./Event";

type Organization = import("../types/OrganizationSchema").Organization;

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
