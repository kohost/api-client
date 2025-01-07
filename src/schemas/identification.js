export default {
  $schema: "http://json-schema.org/draft-07/schema",
  $id: "identification.json",
  title: "Identification",
  type: "object",
  required: ["type"],
  oneOf: [
    {
      required: ["number"],
    },
    {
      required: ["encryptedNumber"],
    },
  ],
  properties: {
    id: {
      $ref: "definitions.json#/definitions/id",
    },
    type: {
      type: "string",
      enum: ["driversLicense", "passport", "identityCard", "visa"],
    },
    number: {
      string: "string",
    },
    maskedNumber: {
      string: "string",
    },
    encryptedNumber: {
      string: "string",
    },
    issued: {
      type: ["string", "object"],
      format: "date-time",
    },
    expires: {
      type: ["string", "object", "null"],
      format: "date-time",
    },
    verified: {
      type: "boolean",
    },
    matched: {
      type: "boolean",
    },
    firstName: {
      type: "string",
    },
    lastName: {
      type: "string",
    },
    issuingCountry: {
      string: "string",
      minLength: 2,
      maxLength: 2,
    },
    systemId: {
      $ref: "definitions.json#/definitions/systemId",
    },
  },
};
