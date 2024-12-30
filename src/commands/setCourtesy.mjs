import { Command } from "./command.mjs";

export class SetCourtesy extends Command {
  constructor({ id, state, ...rest }) {
    super({ id, state, ...rest });
  }

  get name() {
    return "SetCourtesy";
  }
}
