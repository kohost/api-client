import { type Definitions } from "./definitions.json";

const statusEnums = [
  "queued",
  "accepted",
  "sending",
  "sent",
  "failed",
  "delivered",
  "undelivered",
  "receiving",
  "received",
  "read",
] as const;

export const schema = {
  $schema: "http://json-schema.org/draft-07/schema",
  $id: "smsMessage.json",
  title: "SMS Message",
  type: "object",
  required: ["to", "from", "status"],
  properties: {
    id: {
      $ref: "definitions.json#/definitions/id",
    },
    type: {
      type: "string",
      default: "smsMessage",
    },
    to: {
      type: "string",
      pattern: "^\\+[0-9]{1,14}$",
    },
    from: {
      type: "string",
      pattern: "^\\+[0-9]{1,14}$",
    },
    media: {
      type: "string",
      format: "uri",
    },
    status: {
      type: "string",
      enum: statusEnums,
    },
    body: {
      type: "string",
    },
    driver: {
      $ref: "definitions.json#/definitions/driver",
    },
    appData: {
      type: "object",
    },
    createdAt: {
      $ref: "definitions.json#/definitions/date",
    },
    updatedAt: {
      $ref: "definitions.json#/definitions/date",
    },
    systemId: {
      $ref: "definitions.json#/definitions/systemId",
    },
  },
} as const;

type SMSStatus = (typeof statusEnums)[number];

export interface SMSMessageSchema {
  id: Definitions["id"];
  type: "smsMessage";
  to: string;
  from: string;
  media?: string;
  status: SMSStatus;
  body: string;
  driver: Definitions["driver"];
  appData?: Record<string, unknown>;
  createdAt: Definitions["date"];
  updatedAt: Definitions["date"];
  systemId?: Definitions["systemId"];
}
