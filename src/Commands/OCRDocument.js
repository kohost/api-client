import Command from "./Command";

class OCRDocument extends Command {
  constructor({ type, image, ...rest }) {
    super({ type, image, ...rest });
  }

  get name() {
    return "OCRDocument";
  }
}

export default OCRDocument;
