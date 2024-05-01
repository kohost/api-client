const Event = require("./Event");

class SystemAlarmUpdatedEvent extends Event {
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

module.exports = SystemAlarmUpdatedEvent;
