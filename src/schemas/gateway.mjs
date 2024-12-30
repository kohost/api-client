export default {
  $schema: "http://json-schema.org/draft-07/schema",
  $id: "iotGateway.json",
  title: "IoT Gateway",
  description:
    "Any smart gateway that is an entrypoint for controlling devices",
  type: "object",
  properties: {
    id: {
      $ref: "definitions.json#/definitions/id",
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
  },
  required: ["id", "type", "status", "driver"],
};
