import Thermostat from "../Models/Thermostat";
import Event from "./Event";

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
