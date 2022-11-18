const Event = require("./Event");

class SystemUserUpdatedEvent extends Event {
  constructor(thermostat) {
    super(thermostat);
  }

  get name() {
    return "SystemUserUpdated";
  }

  get routingKey() {
    return `user.${this.data.id}.updated`;
  }
}

module.exports = SystemUserUpdatedEvent;
