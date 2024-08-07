const Command = require("./Command");

class SellProducts extends Command {
  constructor({ reservationId, userId, products, ...rest }) {
    super({ reservationId, userId, products, ...rest });
  }

  get name() {
    return "SellProducts";
  }
}

module.exports = SellProducts;
