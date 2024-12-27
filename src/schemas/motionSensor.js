module.exports = {
  $schema: "http://json-schema.org/draft-07/schema",
  $id: "motionSensor.json",
  title: "Motion Sensor",
  description: "Any smart motion sensor",
  type: "object",
  properties: {
    id: {
      $ref: "definitions.json#/definitions/id",
    },
    type: {
      $ref: "definitions.json#/definitions/type",
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
  },
  additionalProperties: false,
  required: ["id", "type", "driver"],
};
