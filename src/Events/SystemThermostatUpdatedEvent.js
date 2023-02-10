const Event = require("./Event");

class SystemThermostatUpdatedEvent extends Event {
  constructor(thermostat) {
    super(thermostat);
  }

  get name() {
    return "SystemThermostatUpdated";
  }

  get routingKey() {
    return `thermostat.${this.keyId}.updated`;
  }
}

module.exports = SystemThermostatUpdatedEvent;
