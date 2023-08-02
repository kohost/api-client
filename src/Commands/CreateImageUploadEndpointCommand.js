const Command = require("./Command");

class CreateImageUploadEndpointCommand extends Command {
  constructor({ id, expires, ...rest }) {
    super({ id, expires, ...rest });
  }

  get name() {
    return "CreateImageUploadEndpoint";
  }

  get routingKey() {
    return "image.createUploadEndpoint";
  }
}

module.exports = CreateImageUploadEndpointCommand;
