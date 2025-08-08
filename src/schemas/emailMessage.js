export default {
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
      type: "string",
      default: "emailMessage",
      enum: ["emailMessage"],
    },
    to: {
      type: "string",
    },
    from: {
      type: "string",
      description: "Must be in the format of 'Sender <email@example.com>",
    },
    subject: {
      type: "string",
    },
    status: {
      type: "string",
      enum: [
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
      ],
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
