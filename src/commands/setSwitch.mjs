import { Command } from "./command.mjs";

export class SetSwitch extends Command {
  constructor({ id, state, ...rest }) {
    super({ id, state, ...rest });
  }

  get name() {
    return "SetSwitch";
  }
}
