import Event from "./Event";

class SystemUserUpdate extends Event {
  constructor(user, context) {
    super(user, context);
  }

  static get name() {
    return "SystemUserUpdated";
  }

  static get entity() {
    return "user";
  }
}

export default SystemUserUpdate;
