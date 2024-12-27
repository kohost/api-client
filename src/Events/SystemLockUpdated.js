import Event from "./Event";

class SystemLockUpdated extends Event {
  constructor(lock, context) {
    super(lock, context);
  }

  static get name() {
    return "SystemLockUpdated";
  }

  static get entity() {
    return "lock";
  }
}

export default SystemLockUpdated;
