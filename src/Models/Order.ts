import { FromSchema } from "json-schema-to-ts";
import { definitionsSchema } from "../schemas/definitions";
import { createValidator, registerSchema } from "../utils/validation";
import { orderSchema } from "./../schemas/order";
import { Entity } from "./Entity";

registerSchema(orderSchema);
const validator = createValidator(orderSchema);

export type OrderSchema = FromSchema<
  typeof orderSchema,
  { references: [typeof definitionsSchema] }
>;

export class Order extends Entity<OrderSchema> {
  static schema = orderSchema;
  validator = validator;

  getSubTotal(): number {
    return this.items.reduce((acc, item) => {
      const qty = item.quantity || 1;
      return acc + item.price * qty;
    }, 0);
  }

  getTaxTotal(): number {
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

  getDeliveryTotal(): number {
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

  getFeesTotal(): number {
    const fees = this.fees;
    return fees.reduce((acc, fee) => {
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
    return this.payments.reduce((acc, payment) => {
      return acc + payment.amount;
    }, 0);
  }

  getBalance() {
    return this.getTotal() - this.getPaymentsTotal();
  }
}

export default Order;
