export default {
  $schema: "http://json-schema.org/draft-07/schema",
  $id: "courtesy.json",
  title: "Courtesy",
  description: "Any smart courtesy system",
  type: "object",
  required: ["id", "type", "driver", "supportedStates", "state"],
  additionalProperties: false,
  properties: {
    id: {
      $ref: "definitions.json#/definitions/id",
    },
    name: {
      type: "string",
    },
    type: {
      type: "string",
      enum: ["courtesy"],
      default: "courtesy",
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
    supportedStates: {
      type: "array",
      uniqueItems: true,
      items: {
        enum: ["privacy", "service", "none"],
      },
    },
    state: {
      type: "string",
      $ref: "#/properties/supportedStates/items",
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
};
