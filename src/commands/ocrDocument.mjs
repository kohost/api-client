import { Command } from "./command.mjs";

export class OCRDocument extends Command {
  constructor({ type, image, ...rest }) {
    super({ type, image, ...rest });
  }

  get name() {
    return "OCRDocument";
  }
}
