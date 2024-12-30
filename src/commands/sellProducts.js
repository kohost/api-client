import { Command } from "./command";

export class SellProducts extends Command {
  constructor({ reservationId, userId, products, ...rest }) {
    super({ reservationId, userId, products, ...rest });
  }

  get name() {
    return "SellProducts";
  }
}
