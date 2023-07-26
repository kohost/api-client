const Event = require("./Event");

class SystemAlarmUpdatedEvent extends Event {
  constructor(alarm) {
    super(alarm);
  }

  get name() {
    return "SystemAlarmUpdated";
  }

  get routingKey() {
    return `alarm.${this.keyId}.updated`;
  }
}

module.exports = SystemAlarmUpdatedEvent;
