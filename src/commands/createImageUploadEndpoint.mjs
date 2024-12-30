import { Command } from "./command.mjs";

export class CreateImageUploadEndpoint extends Command {
  constructor({ id, expires, ...rest }) {
    super({ id, expires, ...rest });
  }

  get name() {
    return "CreateImageUploadEndpoint";
  }
}
