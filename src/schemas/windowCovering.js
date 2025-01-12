export default {
  $schema: "http://json-schema.org/draft-07/schema",
  $id: "windowCovering.json",
  title: "Window Covering",
  description: "Any smart window covering",
  type: "object",
  properties: {
    id: {
      $ref: "definitions.json#/definitions/id",
    },
    name: {
      type: "string",
    },
    type: {
      $ref: "definitions.json#/definitions/type",
      default: "windowCovering",
    },
    discriminator: {
      type: "string",
      enum: ["basic", "variable"],
      default: "variable",
    },
    supportedNotifications: {
      $ref: "definitions.json#/definitions/supportedNotifications",
    },
    notification: {
      $ref: "definitions.json#/definitions/notification",
    },
    driver: {
      $ref: "definitions.json#/definitions/driver",
    },
    offline: {
      type: "boolean",
    },
    position: {
      type: ["number", "null"],
      minimum: 0,
      maximum: 100,
    },
    systemId: {
      $ref: "definitions.json#/definitions/systemId",
    },
    watts: {
      $ref: "definitions.json#/definitions/watts",
    },
    icon: {
      type: "string",
    },
    modelNumber: {
      type: "string",
    },
    serialNumber: {
      type: "string",
    },
    firmwareVersion: {
      type: "string",
    },
  },
  required: ["id", "type", "position", "driver"],
};
