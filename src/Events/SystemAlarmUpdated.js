import Event from "./Event";

class SystemAlarmUpdated extends Event {
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

export default SystemAlarmUpdated;
