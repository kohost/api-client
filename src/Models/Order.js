const schemas = require("../utils/schema");
const schema = require("../schemas/order.json");
const Kohost = require("./Kohost");

schemas.add(schema);
const validator = schemas.compile(schema);

class Order extends Kohost {
  /**
   * @typedef {import("../schemas/OrderSchema").Order} OrderType
   * Create a Order instance.
   * @constructor
   * @param {OrderType} order - The order object of type Order.
   */
  constructor(order) {
    super(order);
  }

  getSubTotal() {
    return this.items.reduce((acc, item) => {
      return acc + item.price;
    }, 0);
  }

  getTaxTotal() {}

  getTotal() {}

  getDeliveryTotal() {}

  getFeesTotal() {}
}

Object.defineProperty(Order.prototype, "schema", {
  value: schema,
});

Object.defineProperty(Order.prototype, "validator", {
  get: function () {
    return validator;
  },
});

Object.defineProperty(Order, "validProperties", {
  value: Object.keys(schema.properties),
});

module.exports = Order;
