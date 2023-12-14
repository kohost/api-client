import Command from "./Command";

interface SellProductsCommandOptions {
  reservationId: string;
  userId: string;
  products: {
    id: string;
    count: number;
    price?: number;
  }[];
  [key: string]: any;
}

class SellProductsCommand extends Command {
  constructor(options: SellProductsCommandOptions) {
    super(options);
  }

  get name() {
    return "SellProducts";
  }

  get routingKey() {
    return `product.${this.data.id}.sell`;
  }
}

export default SellProductsCommand;
