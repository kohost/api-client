import Event from "./Event";

type Alarm = import("../types/AlarmSchema").Alarm;

class SystemAlarmUpdatedEvent extends Event {
  constructor(alarm: Alarm) {
    super(alarm);
  }

  get name() {
    return "SystemAlarmUpdated";
  }

  get routingKey() {
    return `alarm.${this.keyId}.updated`;
  }
}

export default SystemAlarmUpdatedEvent;
