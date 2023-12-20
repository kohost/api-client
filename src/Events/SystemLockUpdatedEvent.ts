import Lock from "../Models/Lock";
import Event from "./Event";

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
