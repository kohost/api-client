const Command = require("./Command");
const RequestError = require("../Errors/RequestError");

class OCRDocumentCommand extends Command {
  constructor({ type, image }) {
    if (!type) throw new RequestError("document type is required");
    if (!image) throw new RequestError("document image is required");
    super({ type, image });
  }

  get name() {
    return "OCRDocument";
  }

  get routingKey() {
    return `document.${this.data.type}.ocr`;
  }
}

module.exports = OCRDocumentCommand;
