import { Command } from "./command.mjs";

export class GetCategories extends Command {
  constructor({ id, ...rest }) {
    super({ id, ...rest });
  }

  get name() {
    return "GetCategories";
  }
}
