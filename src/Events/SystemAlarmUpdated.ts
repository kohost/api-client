import { AlarmSchema } from "../Models/Alarm";
import { Event } from "./Event";

class SystemAlarmUpdated extends Event {
  constructor(alarm: AlarmSchema, context = {}) {
    super(alarm, context);
  }

  static get name() {
    return "SystemAlarmUpdated";
  }

  get entity() {
    return "alarm" as const;
  }
}

export default SystemAlarmUpdated;
