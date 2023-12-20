import Alarm from "../Models/Alarm";
import Event from "./Event";

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
