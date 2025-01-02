import { Event } from "./event";

export class SystemAlarmUpdated extends Event {
  constructor(alarm, context) {
    super(alarm, context);
  }

  static get name() {
    return "SystemAlarmUpdated";
  }

  static get entity() {
    return "alarm";
  }
}
