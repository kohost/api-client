import { Event } from "./event";

export class SystemSwitchUpdated extends Event {
  constructor(_switch, context) {
    super(_switch, context);
  }

  static get name() {
    return "SystemSwitchUpdated";
  }

  static get entity() {
    return "switch";
  }
}
