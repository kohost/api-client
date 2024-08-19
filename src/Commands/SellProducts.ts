import { Command } from "./Command";

interface SellProductOptionsProduct {
  id: string;
  quantity: number;
  price?: number;
}

export interface SellProductsOptions {
  reservationId: string;
  userId: string;
  products: SellProductOptionsProduct[]; // Consider creating a more specific type for products
}

export class SellProducts extends Command {
  constructor(options: SellProductsOptions & { [key: string]: any }) {
    const { reservationId, userId, products, ...rest } = options;
    super({ reservationId, userId, products, ...rest });
  }

  get name() {
    return "SellProducts";
  }
}

export default SellProducts;
