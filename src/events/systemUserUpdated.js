import { Event } from "./event";

export class SystemUserUpdated extends Event {
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
