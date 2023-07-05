const Command = require("./Command");

class SellProductsCommand extends Command {
  constructor({ reservationId, userId, products, ...rest }) {
    super({ reservationId, userId, products, ...rest });
  }

  get name() {
    return "SellProducts";
  }

  get routingKey() {
    return `product.${this.data.id}.sell`;
  }
}

module.exports = SellProductsCommand;
