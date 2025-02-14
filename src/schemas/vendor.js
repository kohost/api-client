export default {
  $schema: "http://json-schema.org/draft-07/schema",
  $id: "vendor.json",
  title: "Vendor",
  type: "object",
  required: ["id", "name", "email"],
  properties: {
    id: {
      $ref: "definitions.json#/definitions/id",
    },
    type: {
      type: "string",
      default: "vendor",
      enum: ["vendor"],
    },
    name: {
      type: "string",
    },
    phone: {
      type: ["string", "null"],
      pattern: "^\\+[0-9]{1,14}$",
    },
    email: {
      type: ["string", "null"],
      format: "email",
    },
    address: {
      $ref: "definitions.json#/definitions/address",
    },
    photo: {
      $ref: "mediaFile.json#",
    },
    createdAt: {
      $ref: "definitions.json#/definitions/createdAt",
    },
    updatedAt: {
      $ref: "definitions.json#/definitions/updatedAt",
    },
  },
};
