const Command = require("./Command");

class DiscoverProductsCommand extends Command {
  constructor({ id, externalSystemId, ...rest }) {
    super({ id, externalSystemId, ...rest });
  }

  get name() {
    return "DiscoverProducts";
  }
}

module.exports = DiscoverProductsCommand;
