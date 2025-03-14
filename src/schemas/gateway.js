export default {
  $schema: "http://json-schema.org/draft-07/schema",
  $id: "iotGateway.json",
  title: "Gateway",
  description:
    "Any smart gateway that is an entrypoint for controlling devices",
  type: "object",
  properties: {
    id: {
      $ref: "definitions.json#/definitions/id",
    },
    name: {
      type: "string",
    },
    offline: {
      type: "boolean",
    },
    type: {
      $ref: "definitions.json#/definitions/type",
    },
    supportedNotifications: {
      $ref: "definitions.json#/definitions/supportedNotifications",
    },
    notification: {
      $ref: "definitions.json#/definitions/notification",
    },
    status: {
      type: "string",
    },
    systemId: {
      $ref: "definitions.json#/definitions/systemId",
    },
    driver: {
      $ref: "definitions.json#/definitions/driver",
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
  required: ["id", "type", "status", "driver"],
};
