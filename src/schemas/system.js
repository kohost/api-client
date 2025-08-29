export default {
  $schema: "http://json-schema.org/draft-07/schema",
  $id: "system.json",
  title: "System",
  type: "object",
  required: ["id", "type", "driver", "entities"],
  properties: {
    id: {
      type: "string",
    },
    type: {
      type: "string",
      default: "system",
      enum: ["system"],
    },
    name: {
      type: "string",
    },
    driver: {
      $ref: "definitions.json#/definitions/driver",
      example: "salto",
      description: "The driver value that implements the system",
    },
    organizationId: {
      type: "string",
      description: "The id of the organization that uses the system",
    },
    propertyId: {
      type: "string",
      description: "The id of the property that uses the system",
    },
    entities: {
      type: "array",
      description: "The entities produced by the system",
      default: [],
      items: {
        type: "object",
        required: ["systemId"],
        properties: {
          id: {
            type: "string",
            description: "The id of the entity",
          },
          systemId: {
            type: "string",
            description: "The id of the entity as known by the system",
          },
          type: {
            type: "string",
            description: "The type of the entity",
          },
          discriminator: {
            type: "string",
            description: "The discriminator of the entity",
          },
          propertyIds: {
            type: "array",
            description:
              "The ids of the properties where the entity is located",
            items: {
              type: "string",
            },
          },
        },
      },
    },
    driverApiVersion: {
      type: "string",
      description: "The version of the driver API used by the system",
    },
    logo: {
      $ref: "mediaFile.json#",
    },
    config: {
      type: "object",
      additionalProperties: true,
      description: "The runtime configuration of the system",
    },
    contactInfo: {
      type: "object",
      additionalProperties: false,
      properties: {
        websiteUrl: {
          type: "string",
          description: "The website URL of the system",
        },
        email: {
          type: "string",
          description: "The email address of the system",
        },
        phone: {
          type: "string",
          description: "The phone number of the system",
        },
        itunesAppId: {
          type: "string",
          example: "807316865",
        },
        googleAppId: {
          type: "string",
          example: "tw.com.geovision.gvaccesscontrol",
        },
      },
    },
    health: {
      type: "object",
      properties: {
        lastHeartbeatAt: {
          type: "string",
          description:
            "The date and time of the last communication with the system",
          format: "date-time",
        },
      },
    },
    createdAt: {
      $ref: "definitions.json#/definitions/createdAt",
    },
    updatedAt: {
      $ref: "definitions.json#/definitions/updatedAt",
    },
  },
};
