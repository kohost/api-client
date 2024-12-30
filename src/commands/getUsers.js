import { Command } from "./command";

export class GetUsers extends Command {
  constructor({ id, ...rest }) {
    super({ id, ...rest });
  }

  get name() {
    return "GetUsers";
  }
}
