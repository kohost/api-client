export default {
  $schema: "http://json-schema.org/draft-07/schema",
  $id: "smsMessage.json",
  title: "Sms Message",
  type: "object",
  required: ["to", "from", "status"],
  properties: {
    id: {
      $ref: "definitions.json#/definitions/id",
    },
    type: {
      type: "string",
      default: "smsMessage",
      enum: ["smsMessage"],
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
      enum: [
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
      ],
    },
    body: {
      type: "string",
    },
    driver: {
      type: "string",
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
};
