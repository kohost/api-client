import { Command } from "./Command";

export class CreateImageUploadEndpoint extends Command {
  constructor({ id, expires, ...rest }) {
    super({ id, expires, ...rest });
  }

  get name() {
    return "CreateImageUploadEndpoint";
  }
}
