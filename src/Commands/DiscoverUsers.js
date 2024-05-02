const Command = require("./Command");

class DiscoverUsers extends Command {
  constructor({ id, ...rest }) {
    super({ id, ...rest });
  }

  get name() {
    return "DiscoverUsers";
  }
}

module.exports = DiscoverUsers;
