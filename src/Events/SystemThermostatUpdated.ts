import { ThermostatSchema } from "../Models/Thermostat";
import { Event } from "./Event";

export class SystemThermostatUpdate extends Event {
  constructor(thermostat: ThermostatSchema, context = {}) {
    super(thermostat, context);
  }

  static get name() {
    return "SystemThermostatUpdated";
  }

  get entity() {
    return "thermostat" as const;
  }
}

export default SystemThermostatUpdate;
