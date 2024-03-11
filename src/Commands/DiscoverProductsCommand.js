const Command = require("./Command");

class DiscoverProductsCommand extends Command {
  constructor({ id, externalSystemId, ...rest }) {
    super({ id, externalSystemId, ...rest });
  }

  get name() {
    return "DiscoverProducts";
  }

  get routingKey() {
    if (Array.isArray(this.data.id)) {
      return `product.${this.data.id.join("-")}.get`;
    }
    if (Array.isArray(this.data.externalSystemId)) {
      return `product.${this.data.externalSystemId.join("-")}.get`;
    }
    if (this.data.externalSystemId) {
      return `product.${this.data.externalSystemId}.get`;
    }

    return `product.${this.data.id}.get`;
  }
}

module.exports = DiscoverProductsCommand;
