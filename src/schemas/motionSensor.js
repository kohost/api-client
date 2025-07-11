export default {
  $schema: "http://json-schema.org/draft-07/schema",
  $id: "motionSensor.json",
  title: "Motion Sensor",
  description: "Any smart motion sensor",
  type: "object",
  required: ["id", "type", "driver"],
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
      default: "motionSensor",
      enum: ["motionSensor"],
    },
    offline: {
      type: "boolean",
    },
    driver: {
      $ref: "definitions.json#/definitions/driver",
    },
    systemId: {
      $ref: "definitions.json#/definitions/systemId",
    },
    supportedNotifications: {
      $ref: "definitions.json#/definitions/supportedNotifications",
    },
    notification: {
      $ref: "definitions.json#/definitions/notification",
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
