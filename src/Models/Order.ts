import { add, compile } from "../utils/schema";
import schema, { properties } from "../schemas/order.json";
import Entity from "./Entity";
import { OrderSchema } from "../types/OrderSchema";

add(schema);
const validator = compile(schema);

class Order extends Entity {
  constructor(order: OrderSchema) {
    super(order);
  }

  schema = schema;
  validator = validator;
  validProperties = Object.keys(properties);

  getSubTotal(): number {
    return this.items.reduce((acc: number, item: any) => {
      const qty = item.quantity || 1;
      return acc + item.price * qty;
    }, 0);
  }

  getTaxTotal(): number {
    const taxes = this.taxes;
    if (!taxes) return 0;
    return this.items.reduce((acc: number, item: any) => {
      if (!item.taxClass) return acc;
      const tax = taxes.find((t: any) => t.class === item.taxClass);
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
    return this.items.reduce((acc: number, item: any) => {
      if (!item.deliveryClass) return acc;
      const d = delivery.find((d: any) => d.class === item.deliveryClass);
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
    return fees.reduce((acc: number, fee: any) => {
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
    return this.payments.reduce((acc: number, payment: any) => {
      return acc + payment.amount;
    }, 0);
  }

  getBalance() {
    return this.getTotal() - this.getPaymentsTotal();
  }
}

export default Order;
