import Event from "./Event";

type Product = import("../types/ProductSchema").Product;

class SystemProductUpdatedEvent extends Event {
  constructor(product: Product) {
    super(product);
  }

  get name() {
    return "SystemProductUpdated";
  }

  get routingKey() {
    return `product.${this.keyId}.updated`;
  }
}

export default SystemProductUpdatedEvent;
