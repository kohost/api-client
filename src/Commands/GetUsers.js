const Command = require("./Command");

class GetUsers extends Command {
  constructor({ id, ...rest }) {
    super({ id, ...rest });
  }

  get name() {
    return "GetUsers";
  }
}

module.exports = GetUsers;
