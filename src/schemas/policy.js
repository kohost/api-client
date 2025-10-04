export default {
  $schema: "http://json-schema.org/draft-07/schema",
  $id: "policy.json",
  title: "Policy",
  description:
    "A policy is a set of permissions that can be applied to a user to limit their access to resources.",
  type: "object",
  required: [
    "id",
    "name",
    "type",
    "organizationId",
    "propertyId",
    "permissions",
    "discriminator",
  ],
  properties: {
    id: {
      $ref: "definitions.json#/definitions/id",
    },
    type: {
      type: "string",
      default: "policy",
      enum: ["policy"],
    },
    discriminator: {
      type: "string",
      enum: ["user"],
    },
    name: {
      type: "string",
      minLength: 1,
    },
    description: {
      type: "string",
    },
    organizationId: {
      type: "string",
    },
    propertyId: {
      type: "string",
    },
    permissions: {
      type: "array",
      items: {
        type: "object",
        required: ["entities", "effect"],
        properties: {
          entities: {
            type: "array",
            items: {
              type: "string",
              pattern: "^[^:]+(:.+)+$",
            },
          },
          effect: {
            type: "string",
            enum: ["Allow", "Deny"],
          },
        },
      },
    },
    createdAt: {
      $ref: "definitions.json#/definitions/date",
    },
    updatedAt: {
      $ref: "definitions.json#/definitions/date",
    },
    deletedAt: {
      $ref: "definitions.json#/definitions/date",
    },
  },
};
