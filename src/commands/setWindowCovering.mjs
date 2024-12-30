import { Command } from "./command.mjs";

export class SetWindowCovering extends Command {
  constructor({ id, position, ...rest }) {
    super({ id, position, ...rest });
  }

  get name() {
    return "SetWindowCovering";
  }
}
