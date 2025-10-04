export default {
  $schema: "http://json-schema.org/draft-07/schema",
  $id: "session.json",
  title: "Session",
  type: "object",
  required: [
    "id",
    "type",
    "userId",
    "organizationId",
    "userAgent",
    "expires",
    "data",
  ],
  properties: {
    id: {
      $ref: "definitions.json#/definitions/id",
    },
    type: {
      type: "string",
      default: "session",
      enum: ["session"],
    },
    userId: {
      type: "string",
    },
    organizationId: {
      type: "string",
    },
    userAgent: {
      type: "string",
    },
    expires: {
      type: ["string", "object", "null"],
    },
    data: {
      type: "object",
      additionalProperties: true,
    },
    createdAt: {
      $ref: "definitions.json#/definitions/date",
    },
    updatedAt: {
      $ref: "definitions.json#/definitions/date",
    },
  },
};
