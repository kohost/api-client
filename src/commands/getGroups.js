import { Command } from "./command";

export class GetGroups extends Command {
  constructor({ id, ...rest }) {
    super({ id, ...rest });
  }

  get name() {
    return "GetGroups";
  }
}
