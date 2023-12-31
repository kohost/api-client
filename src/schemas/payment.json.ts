import { type Definitions } from "./definitions.json";

const paymentTypes = [
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
  $id: "payment.json",
  title: "Payment",
  type: "object",
  required: ["type", "maskedNumber", "expires"],
  properties: {
    id: {
      $ref: "definitions.json#/definitions/id",
    },
    type: {
      type: "string",
      enum: paymentTypes,
    },
    enabled: {
      type: "boolean",
      default: true,
    },
    storageData: {
      type: ["string", "null"],
    },
    maskedNumber: {
      string: "string",
    },
    issued: {
      type: ["string", "null"],
    },
    expires: {
      string: ["string", "object", "null"],
      format: "date-time",
    },
    systemId: {
      $ref: "definitions.json#/definitions/systemId",
    },
  },
};

type PaymentType = (typeof paymentTypes)[number];

export interface PaymentSchema {
  id: Definitions["id"];
  type: PaymentType;
  enabled?: boolean;
  storageData?: string | null;
  maskedNumber: string;
  issued?: string | null;
  expires: Definitions["date"] | null;
  systemId?: Definitions["systemId"];
}
