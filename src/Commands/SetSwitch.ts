import { SwitchSchema } from "../Models/Switch";
import { Command } from "./Command";

export interface SetSwitchOptions {
  id: string;
  state: SwitchSchema["state"];
}

export class SetSwitch extends Command {
  constructor(options: SetSwitchOptions & { [key: string]: any }) {
    const { id, state, ...rest } = options;
    super({ id, state, ...rest });
  }

  get name() {
    return "SetSwitch";
  }
}

export default SetSwitch;
