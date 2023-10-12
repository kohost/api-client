const Command = require("./Command");
const RequestError = require("../Errors/RequestError");

class OCRDocumentCommand extends Command {
  constructor({ type, image, ...rest }) {
    if (!image) throw new RequestError("document image is required");
    super({ type, image, ...rest });
  }

  get name() {
    return "OCRDocument";
  }
}

module.exports = OCRDocumentCommand;
