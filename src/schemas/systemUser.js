module.exports = {
  $schema: "http://json-schema.org/draft-07/schema",
  $id: "systemUser.json",
  title: "System User",
  description:
    "A system user is a user that originated from an external 3rd party system.",
  type: "object",
  required: ["firstName", "lastName"],
  properties: {
    id: {
      $ref: "definitions.json#/definitions/id",
    },
    type: {
      type: "string",
      default: "systemUser",
      enum: ["systemUser"],
    },
    driver: {
      $ref: "definitions.json#/definitions/driver",
    },
    firstName: {
      type: "string",
    },
    lastName: {
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
      type: "string",
    },
    jobTitle: {
      type: "string",
    },
    dob: {
      type: "string",
    },
    gender: {
      type: "string",
      enum: ["male", "female"],
    },
    roles: {
      type: "array",
      items: {
        type: "string",
        enum: [
          "Guest",
          "User",
          "Manager",
          "Maintenance",
          "Administrator",
          "SuperAdmin",
        ],
      },
    },
    nationality: {
      type: "string",
      minLength: 2,
      maxLength: 2,
    },
    notes: {
      type: "array",
      items: {
        type: "string",
      },
    },
    files: {
      type: "array",
      items: {
        $ref: "mediaFile.json#",
      },
    },
    identifications: {
      type: "array",
      items: {
        $ref: "identification.json#",
      },
    },
    payments: {
      type: "array",
      items: {
        $ref: "payment.json#",
      },
    },
    revenue: {
      $ref: "definitions.json#/definitions/revenue",
    },
    createdAt: {
      $ref: "definitions.json#/definitions/createdAt",
    },
    updatedAt: {
      $ref: "definitions.json#/definitions/updatedAt",
    },
    systemId: {
      $ref: "definitions.json#/definitions/systemId",
    },
  },
};
