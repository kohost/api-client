import { RequestError } from "../Errors";
import { Command } from "./Command";

export class OCRDocument extends Command {
  constructor({ type, image, ...rest }) {
    if (!image) throw new RequestError("document image is required");
    super({ type, image, ...rest });
  }

  get name() {
    return "OCRDocument";
  }
}
