import { Command } from "./command.mjs";

export class SetMedia extends Command {
  constructor({ id, command, ...rest }) {
    super({ id, command, ...rest });
  }

  get name() {
    return "SetMedia";
  }
}
