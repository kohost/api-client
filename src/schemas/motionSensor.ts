export const motionSensorSchema = {
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
      type: "string",
      enum: ["motionSensor"],
      default: "motionSensor",
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
} as const;
