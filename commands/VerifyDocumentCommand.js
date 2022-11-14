const Command = require("./Command");
const RequestError = require("../errors/RequestError");

class VerifyDocumentCommand extends Command {
  constructor({ type, image }) {
    if (!type) throw new RequestError("document type is required");
    if (!image) throw new RequestError("document image is required");
    super({ type, image });
  }

  get name() {
    return "VerifyDocument";
  }

  get routingKey() {
    return `document.${this.data.type}.verify`;
  }

  get replyTo() {
    return "system.response.documents";
  }
}

module.exports = VerifyDocumentCommand;
