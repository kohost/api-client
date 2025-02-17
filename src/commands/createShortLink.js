import { Command } from "./command";

export class CreateShortLink extends Command {
  constructor({ title, destination, ...rest }) {
    super({ title, destination, ...rest });
  }

  get name() {
    return "CreateShortLink";
  }
}
