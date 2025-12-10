import defs, { ISODateString } from "./definitions";
import type { FromSchema } from "json-schema-to-ts";

export const paymentSchema = {
  $schema: "http://json-schema.org/draft-07/schema",
  $id: "payment.json",
  title: "Payment",
  type: "object",
  required: ["type", "maskedNumber", "expires"],
  additionalProperties: false,
  properties: {
    id: {
      $ref: "definitions.json#/definitions/id",
    },
    type: {
      type: "string",
      enum: [
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
    enabled: {
      type: "boolean",
      default: true,
    },
    storageData: {
      type: ["string", "null"],
    },
    maskedNumber: {
      type: "string",
    },
    issued: {
      type: ["string", "null"],
    },
    expires: {
      type: "string",
    },
    systemId: {
      $ref: "definitions.json#/definitions/systemId",
    },
  },
} as const;

export type PaymentSchema = FromSchema<
  typeof paymentSchema,
  {
    references: [typeof defs];
    deserialize: [
      {
        pattern: {
          format: "date-time";
        };
        output: Date | ISODateString;
      },
    ];
  }
>;
