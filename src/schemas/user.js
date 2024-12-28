export default {
  $schema: "http://json-schema.org/draft-07/schema",
  $id: "user.json",
  title: "User",
  type: "object",
  required: ["firstName", "lastName"],
  properties: {
    id: {
      $ref: "definitions.json#/definitions/id",
    },
    type: {
      type: "string",
      default: "user",
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
    phoneVerified: {
      type: "boolean",
    },
    email: {
      type: ["string", "null"],
      format: "email",
    },
    emailVerified: {
      type: "boolean",
    },
    address: {
      $ref: "definitions.json#/definitions/address",
    },
    secretKey: {
      type: "string",
    },
    photo: {
      $ref: "mediaFile.json#",
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
    nationality: {
      type: "string",
      minLength: 2,
      maxLength: 2,
    },
    permissions: {
      type: "array",
      default: [],
      items: {
        type: "object",
        required: ["organizationId", "propertyId", "role"],
        properties: {
          organizationId: {
            type: "string",
            description:
              "The ID of the organization the permission is applies to.",
          },
          propertyId: {
            type: "string",
            description: "The ID of the property the permission is applies to.",
          },
          role: {
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
          department: {
            type: "string",
            description: "The department the user belongs to.",
          },
          policyIds: {
            type: "array",
            items: {
              type: "string",
              description: "ID of a policy that is applied to this role.",
            },
          },
          policies: {
            type: "array",
            items: {
              description:
                "A policy object populated from the policyIds array.",
              $ref: "policy.json",
            },
          },
        },
        additionalProperties: false,
      },
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
    location: {
      type: "object",
      required: ["accuracy", "latitude", "longitude", "timestamp"],
      additionalProperties: false,
      properties: {
        accuracy: {
          type: ["number", "null"],
        },
        latitude: {
          type: ["number", "null"],
        },
        longitude: {
          type: ["number", "null"],
        },
        timestamp: {
          type: ["number", "null"],
        },
      },
    },
    reservations: {
      type: "array",
      items: {
        $ref: "reservation.json",
      },
    },
    spaceName: {
      type: "string",
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
    systems: {
      type: "array",
      default: [],
      items: {
        type: "object",
        properties: {
          systemId: {
            type: "string",
          },
          propertyId: {
            type: "string",
          },
          driver: {
            type: "string",
          },
        },
        required: ["systemId", "propertyId", "driver"],
        additionalProperties: false,
      },
    },
  },
};
