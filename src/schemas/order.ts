import defs from "./definitions";
import type { FromSchema } from "json-schema-to-ts";

export const orderSchema = {
  $schema: "http://json-schema.org/draft-07/schema",
  $id: "order.json",
  title: "Order",
  description: "A purchase order for products or services.",
  type: "object",
  required: ["type", "status"],
  properties: {
    id: {
      $ref: "definitions.json#/definitions/id",
    },
    type: {
      type: "string",
      default: "order",
      enum: ["order"],
    },
    orderNumber: {
      type: "string",
    },
    status: {
      type: "string",
      enum: [
        "draft",
        "pendingPayment",
        "processing",
        "outForDelivery",
        "completed",
        "paymentFailed",
        "cancelled",
        "refunded",
      ],
    },
    userId: {
      $ref: "definitions.json#/definitions/id",
      description: "User id of purchaser",
    },
    reservationId: {
      $ref: "definitions.json#/definitions/id",
      description: "Reservation id if the order is for a reservation",
    },
    date: {
      $ref: "definitions.json#/definitions/date",
    },
    items: {
      type: "array",
      default: [],
      items: {
        type: "object",
        required: ["name", "price"],
        properties: {
          additionalProperties: false,
          name: {
            type: "string",
          },
          sku: {
            type: "string",
          },
          quantity: {
            type: "number",
            default: 1,
          },
          price: {
            type: "number",
          },
          taxClass: {
            type: "string",
          },
          deliveryClass: {
            type: "string",
          },
          productId: {
            type: "string",
          },
        },
      },
    },
    taxes: {
      type: "array",
      default: [],
      items: {
        type: "object",
        required: ["name", "rate"],
        properties: {
          additionalProperties: false,
          name: {
            type: "string",
          },
          class: {
            type: "string",
          },
          rateType: {
            type: "string",
            enum: ["percentage", "flat"],
            default: "percentage",
          },
          rate: {
            type: "number",
          },
          total: {
            type: "number",
          },
        },
      },
    },
    fees: {
      type: "array",
      default: [],
      items: {
        type: "object",
        required: ["name", "price"],
        properties: {
          additionalProperties: false,
          name: {
            type: "string",
          },
          price: {
            type: "number",
          },
        },
      },
    },
    delivery: {
      type: "array",
      default: [],
      items: {
        type: "object",
        required: ["name", "rate"],
        properties: {
          additionalProperties: false,
          name: {
            type: "string",
          },
          class: {
            type: "string",
          },
          rateType: {
            type: "string",
            enum: ["percentage", "flat"],
            default: "percentage",
          },
          rate: {
            type: "number",
          },
          total: {
            type: "number",
          },
        },
      },
    },
    payments: {
      type: "array",
      default: [],
      items: {
        type: "object",
        properties: {
          method: {
            type: "string",
            enum: [
              "folio",
              "invoice",
              "amex",
              "visa",
              "masterCard",
              "maestro",
              "discover",
              "diners",
              "jcb",
              "applePay",
              "alipay",
              "chinaUnionPay",
              "vpay",
            ],
          },
          name: {
            type: "string",
          },
          date: {
            $ref: "definitions.json#/definitions/date",
          },
          amount: {
            type: "number",
          },
          transactionReference: {
            type: "string",
          },
        },
      },
    },
    createdAt: {
      $ref: "definitions.json#/definitions/date",
    },
    updatedAt: {
      $ref: "definitions.json#/definitions/date",
    },
    deletedAt: {
      $ref: "definitions.json#/definitions/date",
    },
  },
} as const;

export type OrderSchema = FromSchema<
  typeof orderSchema,
  { references: [typeof defs] }
>;

function getSubTotal() {
  return this.items.reduce((acc, item) => {
    const qty = item.quantity || 1;
    return acc + item.price * qty;
  }, 0);
}

function getTaxTotal() {
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
    if (rateType === "flat") {
      return acc + rate;
    }
    return acc + rate;
  }, 0);
}

function getDeliveryTotal() {
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

function getFeesTotal() {
  const fees = this.fees;
  return fees.reduce((acc, fee) => {
    return acc + fee.price;
  }, 0);
}

function getTotal() {
  return (
    this.getSubTotal() +
    this.getTaxTotal() +
    this.getDeliveryTotal() +
    this.getFeesTotal()
  );
}

function getPaymentsTotal() {
  return this.payments.reduce((acc, payment) => {
    return acc + payment.amount;
  }, 0);
}

function getBalance() {
  return this.getTotal() - this.getPaymentsTotal();
}

export const methods = {
  getSubTotal: getSubTotal,
  getTaxTotal: getTaxTotal,
  getDeliveryTotal: getDeliveryTotal,
  getFeesTotal: getFeesTotal,
  getTotal: getTotal,
  getPaymentsTotal: getPaymentsTotal,
  getBalance: getBalance,
};
