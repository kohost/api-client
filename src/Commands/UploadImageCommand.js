const Command = require("./Command");

class UploadImageCommand extends Command {
  constructor({ id, url, file, ...rest }) {
    super({ id, url, file, ...rest });
  }

  get name() {
    return "UploadImage";
  }

  get routingKey() {
    return `image.${this.data.id}.upload`;
  }
}

module.exports = UploadImageCommand;
