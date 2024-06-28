import { OrganizationSchema } from "../Models/Organization";
import { Event } from "./Event";

class SystemOrganizationUpdated extends Event {
  constructor(organization: OrganizationSchema, context = {}) {
    super(organization, context);
  }

  static get name() {
    return "SystemOrganizationUpdated";
  }

  get entity() {
    return "organization" as const;
  }
}

export default SystemOrganizationUpdated;
