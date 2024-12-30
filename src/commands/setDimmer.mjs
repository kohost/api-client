import { Command } from "./command.mjs";

export class SetDimmer extends Command {
  constructor({ id, level, ...rest }) {
    super({ id, level, ...rest });
  }

  get name() {
    return "SetDimmer";
  }
}
