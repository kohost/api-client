import { Command } from "./command";

export class SetLock extends Command {
  constructor({ id, state, ...rest }) {
    super({ id, state, ...rest });
  }

  get name() {
    return "SetLock";
  }
}
