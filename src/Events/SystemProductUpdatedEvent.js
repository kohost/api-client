const Event = require("./Event");

class SystemProductUpdatedEvent extends Event {
  constructor(product) {
    super(product);
  }

  get name() {
    return "SystemProductUpdated";
  }

  get routingKey() {
    return `product.${this.keyId}.updated`;
  }
}

module.exports = SystemProductUpdatedEvent;
