import { type Definitions } from "./definitions.json";

const statusEnums = [
  "queued",
  "sending",
  "sent",
  "deferred",
  "delivered",
  "undelivered",
  "bounced",
  "blocked",
  "receiving",
  "received",
  "opened",
  "clicked",
  "unsubscribed",
  "spamReport",
] as const;

export const schema = {
  $schema: "http://json-schema.org/draft-07/schema",
  $id: "emailMessage.json",
  title: "Email Message",
  type: "object",
  required: ["to", "from", "status", "subject"],
  properties: {
    id: {
      $ref: "definitions.json#/definitions/id",
    },
    type: {
      $ref: "definitions.json#/definitions/type",
      default: "emailMessage",
    },
    to: {
      type: "string",
      pattern: "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$",
    },
    from: {
      type: "string",
      pattern: ".*<[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+>.*",
      description: "Must be in the format of 'Sender <email@example.com>",
    },
    subject: {
      type: "string",
    },
    status: {
      type: "string",
      enum: statusEnums,
    },
    statusMessage: {
      type: "string",
    },
    html: {
      type: "string",
    },
    text: {
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

type EmailStatusEnums = (typeof statusEnums)[number];

export interface EmailMessageSchema {
  id?: Definitions["id"];
  type: "emailMessage";
  to: string;
  from: string;
  subject: string;
  status: EmailStatusEnums;
  statusMessage?: string;
  html?: string;
  text?: string;
  driver?: Definitions["driver"];
  appData?: {
    [key: string]: any;
  };
  createdAt?: Definitions["date"];
  updatedAt?: Definitions["date"];
  systemId?: Definitions["systemId"];
}
