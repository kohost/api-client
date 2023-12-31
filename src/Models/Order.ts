import { registerSchema, compileSchema } from "../utils/schema";
import {
  schema,
  type OrderSchema,
  type OrderTax,
  type OrderItem,
  type OrderFee,
  type OrderDelivery,
} from "../schemas/order.json";
import Entity from "./Entity";

registerSchema(schema);

interface Order extends OrderSchema {}

class Order extends Entity {
  constructor(order: OrderSchema) {
    super(order);
  }

  getSubTotal(): number {
    if (!this.items) return 0;
    return this.items.reduce((acc: number, item: OrderItem) => {
      const qty = item.quantity || 1;
      return acc + item.price * qty;
    }, 0);
  }

  getTaxTotal(): number {
    const taxes = this.taxes;
    if (!taxes) return 0;
    if (!this.items) return 0;
    return this.items.reduce((acc: number, item: OrderItem) => {
      if (!item.taxClass) return acc;
      const tax = taxes.find((t: OrderTax) => t.class === item.taxClass);
      if (!tax) return acc;
      const { rateType, rate } = tax;
      if (rateType === "percentage") {
        return acc + item.price * rate;
      }
      return acc + rate;
    }, 0);
  }

  getDeliveryTotal(): number {
    const delivery = this.delivery;
    if (!delivery) return 0;
    if (!this.items) return 0;
    return this.items.reduce((acc: number, item: OrderItem) => {
      if (!item.deliveryClass) return acc;
      const d = delivery.find(
        (d: OrderDelivery) => d.class === item.deliveryClass
      );
      if (!d) return acc;
      const { rateType, rate } = d;
      if (rateType === "percentage") {
        return acc + item.price * rate;
      }
      return acc + rate;
    }, 0);
  }

  getFeesTotal(): number {
    const fees = this.fees;
    if (!fees) return 0;
    return fees.reduce((acc: number, fee: OrderFee) => {
      return acc + fee.price;
    }, 0);
  }

  getTotal(): number {
    return (
      this.getSubTotal() +
      this.getTaxTotal() +
      this.getDeliveryTotal() +
      this.getFeesTotal()
    );
  }

  getPaymentsTotal(): number {
    if (!this.payments) return 0;
    return this.payments.reduce((acc: number, payment: any) => {
      return acc + payment.amount;
    }, 0);
  }

  getBalance(): number {
    return this.getTotal() - this.getPaymentsTotal();
  }
}

Order.validator = compileSchema(schema);
Order.schema = schema;
Order.validProperties = Object.keys(schema.properties);

export default Order;
