import { ProductSchema } from "../Models/Product";
import { Event } from "./Event";

class SystemProductUpdated extends Event {
  constructor(product: ProductSchema, context = {}) {
    super(product, context);
  }

  static get name() {
    return "SystemProductUpdated";
  }

  get entity() {
    return "product" as const;
  }
}

export default SystemProductUpdated;
