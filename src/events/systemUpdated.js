import { Event } from "./event";

export class SystemUpdated extends Event {
  constructor(system, context) {
    super(system, context);
  }

  static get name() {
    return "SystemUpdated";
  }

  static get entity() {
    return "system";
  }
}
