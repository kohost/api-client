import { Command } from "./command.mjs";

export class SetScene extends Command {
  constructor({ id, devices, ...rest }) {
    super({ id, devices, ...rest });
  }

  get name() {
    return "SetScene";
  }
}
