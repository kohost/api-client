const Command = require("./Command");

class GetProductsCommand extends Command {
  constructor({ id, externalSystemId, ...rest }) {
    super({ id, externalSystemId, ...rest });
  }

  get name() {
    return "GetProducts";
  }

  get routingKey() {
    return `product.${this.data.id}.get`;
  }
}

module.exports = GetProductsCommand;
