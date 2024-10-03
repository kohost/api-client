import { Event } from "./Event";

export class SystemThermostatUpdate extends Event {
  constructor(thermostat, context) {
    super(thermostat, context);
  }

  static get name() {
    return "SystemThermostatUpdated";
  }

  static get entity() {
    return "thermostat";
  }
}
