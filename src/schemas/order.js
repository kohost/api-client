module.exports = {
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
  },
};
