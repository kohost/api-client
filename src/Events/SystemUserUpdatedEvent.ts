import Event from "./Event";

type SystemUser = import("../types/SystemUserSchema").SystemUser;

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
