import SystemUser from "../Models/SystemUser";
import Event from "./Event";

class SystemUserUpdatedEvent extends Event {
  constructor(systemUser: SystemUser) {
    super(systemUser);
  }

  get name() {
    return "SystemUserUpdated";
  }

  get routingKey() {
    return `user.${this.keyId}.updated`;
  }
}

export default SystemUserUpdatedEvent;
