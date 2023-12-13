import Event from "./Event";

type Thermostat = import("../types/ThermostatSchema").Thermostat;

class SystemThermostatUpdatedEvent extends Event {
  constructor(thermostat: Thermostat) {
    super(thermostat);
  }

  get name() {
    return "SystemThermostatUpdated";
  }

  get routingKey() {
    return `thermostat.${this.keyId}.updated`;
  }
}

export default SystemThermostatUpdatedEvent;
