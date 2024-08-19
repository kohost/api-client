import { RequestError } from "../Errors";
import { Command } from "./Command";

export interface OCRDocumentOptions {
  type?: string;
  image: string;
}

export class OCRDocument extends Command {
  constructor(options: OCRDocumentOptions & { [key: string]: any }) {
    const { type, image, ...rest } = options;
    if (!image) throw new RequestError("document image is required");
    super({ type, image, ...rest });
  }

  get name() {
    return "OCRDocument";
  }
}

export default OCRDocument;
