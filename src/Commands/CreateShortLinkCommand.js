const Command = require("./Command");
const RequestError = require("../Errors/RequestError");

class CreateShortLinkCommand extends Command {
  constructor({ title, destination, ...rest }) {
    if (!title) throw new RequestError("title is required");
    if (!destination) throw new RequestError("destination to is required");
    super({ title, destination, ...rest });
  }

  get name() {
    return "CreateShortLink";
  }

  get routingKey() {
    return "comm.shortlink.create";
  }
}

module.exports = CreateShortLinkCommand;
