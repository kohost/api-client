import { LockSchema } from "../Models/Lock";
import { Event } from "./Event";

class SystemLockUpdated extends Event {
  constructor(lock: LockSchema, context = {}) {
    super(lock, context);
  }

  static get name() {
    return "SystemLockUpdated";
  }

  get entity() {
    return "lock" as const;
  }
}

export default SystemLockUpdated;
