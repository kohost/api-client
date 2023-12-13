import Event from "./Event";

type Lock = import("../types/LockSchema").Lock;
class SystemLockUpdatedEvent extends Event {
  constructor(lock: Lock) {
    super(lock);
  }

  get name() {
    return "SystemLockUpdated";
  }

  get routingKey() {
    return `lock.${this.keyId}.updated`;
  }
}

export default SystemLockUpdatedEvent;
