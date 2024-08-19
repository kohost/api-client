import { ThermostatSchema } from "../Models/Thermostat";
import { Command } from "./Command";

export interface SetThermostatOptions {
  id: string;
  setpoints?: ThermostatSchema["setpoints"];
  hvacMode?: ThermostatSchema["hvacMode"];
  fanMode?: ThermostatSchema["fanMode"];
}

export class SetThermostat extends Command {
  constructor(options: SetThermostatOptions & { [key: string]: any }) {
    const { id, setpoints, hvacMode, fanMode, ...rest } = options;
    super({ id, setpoints, hvacMode, fanMode, ...rest });
  }

  get name() {
    return "SetThermostat";
  }
}

export default SetThermostat;
