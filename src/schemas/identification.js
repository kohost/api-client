export default {
  $schema: "http://json-schema.org/draft-07/schema",
  $id: "identification.json",
  title: "Identification",
  type: "object",
  required: ["type"],
  additionalProperties: false,
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
      type: "string",
    },
    maskedNumber: {
      type: "string",
    },
    encryptedNumber: {
      type: "string",
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
      type: "string",
      minLength: 2,
      maxLength: 2,
    },
    issuingState: {
      type: "string",
      minLength: 2,
      maxLength: 2,
    },
    systemId: {
      $ref: "definitions.json#/definitions/systemId",
    },
  },
};
