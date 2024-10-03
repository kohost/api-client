import { Command } from "./Command";

export class SetScene extends Command {
  constructor({ id, devices, ...rest }) {
    super({ id, devices, ...rest });
  }

  get name() {
    return "SetScene";
  }
}
