import { Command } from "./command.mjs";

export class UploadImage extends Command {
  constructor({ id, url, file, ...rest }) {
    super({ id, url, file, ...rest });
  }

  get name() {
    return "UploadImage";
  }
}
