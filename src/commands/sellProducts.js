import Command from "./command";

class SellProducts extends Command {
  constructor({ reservationId, userId, products, ...rest }) {
    super({ reservationId, userId, products, ...rest });
  }

  get name() {
    return "SellProducts";
  }
}

export default SellProducts;
