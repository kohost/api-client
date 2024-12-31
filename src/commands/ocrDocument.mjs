import { Command } from "./command";

export class OCRDocument extends Command {
  constructor({ type, image, ...rest }) {
    super({ type, image, ...rest });
  }

  get name() {
    return "OCRDocument";
  }
}
