export default {
  $schema: "http://json-schema.org/draft-07/schema",
  $id: "credential.json",
  title: "Credential",
  type: "object",
  required: ["type", "credential", "expires"],
  properties: {
    id: {
      $ref: "definitions.json#/definitions/id",
    },
    type: {
      type: "string",
      default: "credential",
    },
    driver: {
      $ref: "definitions.json#/definitions/driver",
    },
    discriminator: {
      type: "string",
      enum: [
        "verificationCode",
        "token",
        "mobileKey",
        "pin",
        "publicKey",
        "passkeyChallenge",
      ],
    },
    credential: {
      type: "string",
    },
    userId: {
      type: "string",
    },
    organizationId: {
      type: "string",
    },
    propertyId: {
      type: "string",
    },
    deviceId: {
      type: "string",
    },
    userAgent: {
      type: "string",
    },
    expires: {
      type: ["string", "object", "null"],
    },
    systemId: {
      $ref: "definitions.json#/definitions/systemId",
    },
  },
};
