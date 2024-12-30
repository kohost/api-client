import { Command } from "./command";

export class GetCategories extends Command {
  constructor({ id, ...rest }) {
    super({ id, ...rest });
  }

  get name() {
    return "GetCategories";
  }
}
