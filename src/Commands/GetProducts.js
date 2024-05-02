const Command = require("./Command");

class GetProducts extends Command {
  constructor({ id, externalSystemId, ...rest }) {
    super({ id, externalSystemId, ...rest });
  }

  get name() {
    return "GetProducts";
  }
}

module.exports = GetProducts;
