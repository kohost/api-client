import { type Definitions } from "./definitions.json";

const statusEnums = [
  "draft",
  "pendingPayment",
  "processing",
  "outForDelivery",
  "completed",
  "paymentFailed",
  "cancelled",
  "refunded",
] as const;

const rateTypes = ["percentage", "flat"] as const;

const paymentMethods = [
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
] as const;

export const schema = {
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
    },
    orderNumber: {
      type: "string",
    },
    status: {
      type: "string",
      enum: statusEnums,
    },
    user: {
      $ref: "definitions.json#/definitions/id",
      description: "User id of purchaser",
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
          name: {
            type: "string",
          },
          class: {
            type: "string",
          },
          rateType: {
            type: "string",
            enum: rateTypes,
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
          name: {
            type: "string",
          },
          class: {
            type: "string",
          },
          rateType: {
            type: "string",
            enum: rateTypes,
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
            enum: paymentMethods,
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
  },
} as const;

type OrderStatus = (typeof statusEnums)[number];
type OrderRateType = (typeof rateTypes)[number];
type OrderPaymentMethod = (typeof paymentMethods)[number];

export interface OrderItem {
  name: string;
  sku?: string;
  quantity?: number;
  price: number;
  taxClass?: string;
  deliveryClass?: string;
}

export interface OrderTax {
  name: string;
  class?: string;
  rateType?: OrderRateType;
  rate: number;
  total: number;
}

export interface OrderFee {
  name: string;
  price: number;
}

export interface OrderDelivery {
  name: string;
  class?: string;
  rateType?: OrderRateType;
  rate: number;
  total: number;
}

export interface OrderPayment {
  method?: OrderPaymentMethod;
  name?: string;
  date?: Definitions["date"];
  amount?: number;
  transactionReference?: string;
}

export interface OrderSchema {
  id?: Definitions["id"];
  type: "order";
  orderNumber?: string;
  status: OrderStatus;
  user?: Definitions["id"];
  date?: Definitions["date"];
  items?: OrderItem[];
  taxes?: OrderTax[];
  fees?: OrderFee[];
  delivery?: OrderDelivery[];
  payments?: OrderPayment[];
}
