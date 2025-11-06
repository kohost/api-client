export default {
  $schema: "http://json-schema.org/draft-07/schema",
  $id: "user.json",
  title: "User",
  type: "object",
  required: ["id", "firstName", "lastName"],
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
      type: "string",
      pattern: "^\\+[0-9]{1,14}$",
    },
    phoneVerified: {
      type: "boolean",
    },
    email: {
      type: "string",
      format: "email",
    },
    emailVerified: {
      type: "boolean",
    },
    whatsapp: {
      type: "string",
      pattern: "^\\+[0-9]{1,14}$",
    },
    whatsappVerified: {
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
              "Agent",
              "Manager",
              "Maintenance",
              "Administrator",
              "SuperAdmin",
            ],
          },
          timeTrackingEnabled: {
            type: "boolean",
            description: "Whether time tracking is enabled for this role.",
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
    preferences: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["organizationId", "propertyId"],
        properties: {
          organizationId: {
            type: "string",
          },
          propertyId: {
            type: "string",
          },
          notifications: {
            type: "array",
            items: {
              type: "object",
              additionalProperties: false,
              required: ["discriminator", "enabled"],
              properties: {
                discriminator: {
                  type: "string",
                  enum: ["observerTicketCreated", "observerTicketResolved"],
                },
                enabled: {
                  type: "boolean",
                },
              },
            },
          },
        },
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
    createdAt: {
      $ref: "definitions.json#/definitions/createdAt",
    },
    updatedAt: {
      $ref: "definitions.json#/definitions/updatedAt",
    },
    deletedAt: {
      $ref: "definitions.json#/definitions/date",
    },
  },
};

export const getters = {
  fullName() {
    return `${this.firstName} ${this.lastName}`;
  },
  roles() {
    const roles = new Set();
    if (this.permissions) {
      for (const permission of this.permissions) {
        roles.add(permission.role);
      }
    }
    return Array.from(roles);
  },
  isSuperAdmin() {
    return this.roles.includes("SuperAdmin");
  },
  isAdmin() {
    return this.roles.includes("Admin") || this.roles.includes("Administrator");
  },
  isManager() {
    return this.roles.includes("Manager");
  },
  isUser() {
    return this.roles.includes("User");
  },
};
