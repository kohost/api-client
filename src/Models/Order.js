const schemas = require("../utils/schema");
const schema = require("../schemas/order.json");
const Entity = require("./Entity");

schemas.add(schema);
const validator = schemas.compile(schema);

class Order extends Entity {
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
      const qty = item.quantity || 1;
      return acc + item.price * qty;
    }, 0);
  }

  getTaxTotal() {
    const taxes = this.taxes;
    if (!taxes) return 0;
    return this.items.reduce((acc, item) => {
      if (!item.taxClass) return acc;
      const tax = taxes.find((t) => t.class === item.taxClass);
      if (!tax) return acc;
      const { rateType, rate } = tax;
      if (rateType === "percentage") {
        return acc + item.price * rate;
      }
      return acc + rate;
    }, 0);
  }

  getDeliveryTotal() {
    const delivery = this.delivery;
    if (!delivery) return 0;
    return this.items.reduce((acc, item) => {
      if (!item.deliveryClass) return acc;
      const d = delivery.find((d) => d.class === item.deliveryClass);
      if (!d) return acc;
      const { rateType, rate } = d;
      if (rateType === "percentage") {
        return acc + item.price * rate;
      }
      return acc + rate;
    }, 0);
  }

  getFeesTotal() {
    const fees = this.fees;
    return fees.reduce((acc, fee) => {
      return acc + fee.price;
    }, 0);
  }

  getTotal() {
    return (
      this.getSubTotal() +
      this.getTaxTotal() +
      this.getDeliveryTotal() +
      this.getFeesTotal()
    );
  }

  getPaymentsTotal() {
    return this.payments.reduce((acc, payment) => {
      return acc + payment.amount;
    }, 0);
  }

  getBalance() {
    return this.getTotal() - this.getPaymentsTotal();
  }
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
