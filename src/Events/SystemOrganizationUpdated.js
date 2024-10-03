import { Event } from "./Event";

export class SystemOrganizationUpdated extends Event {
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
