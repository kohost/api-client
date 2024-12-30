import { Event } from "./event.mjs";

export class SystemLockUpdated extends Event {
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
