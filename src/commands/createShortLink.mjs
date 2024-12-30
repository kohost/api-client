import { Command } from "./command.mjs";

export class CreateShortLink extends Command {
  constructor({ title, destination, ...rest }) {
    super({ title, destination, ...rest });
  }

  get name() {
    return "CreateShortLink";
  }
}
