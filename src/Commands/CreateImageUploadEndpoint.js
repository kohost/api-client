const Command = require("./Command");

class CreateImageUploadEndpoint extends Command {
  constructor({ id, expires, ...rest }) {
    super({ id, expires, ...rest });
  }

  get name() {
    return "CreateImageUploadEndpoint";
  }
}

module.exports = CreateImageUploadEndpoint;
