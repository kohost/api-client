import Product from "../Models/Product";
import Event from "./Event";

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
