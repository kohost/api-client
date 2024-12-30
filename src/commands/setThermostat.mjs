import { Command } from "./command.mjs";

export class SetThermostat extends Command {
  constructor({ id, setpoints, hvacMode, fanMode, ...rest }) {
    super({ id, setpoints, hvacMode, fanMode, ...rest });
  }

  get name() {
    return "SetThermostat";
  }
}
