import { Command } from "./command";

export class SetScene extends Command {
  constructor({ id, devices, ...rest }) {
    super({ id, devices, ...rest });
  }

  get name() {
    return "SetScene";
  }
}
