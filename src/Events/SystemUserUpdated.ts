import { SystemUserSchema } from "../Models/SystemUser";
import { Event } from "./Event";

export class SystemUserUpdate extends Event {
  constructor(systemUser: SystemUserSchema, context = {}) {
    super(systemUser, context);
  }

  static get name() {
    return "SystemUserUpdated";
  }

  get entity() {
    return "systemUser" as const;
  }
}

export default SystemUserUpdate;
