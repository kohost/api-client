export default {
  $schema: "http://json-schema.org/draft-07/schema",
  $id: "lock.json",
  title: "Lock",
  description: "Any smart lock",
  type: "object",
  properties: {
    id: {
      $ref: "definitions.json#/definitions/id",
    },
    name: {
      type: "string",
    },
    type: {
      type: "string",
      enum: ["lock"],
      default: "lock",
    },
    offline: {
      type: "boolean",
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
    state: {
      type: ["string", "null"],
      enum: ["locked", "unlocked", null],
    },
    mode: {
      type: ["string", "null"],
      enum: [
        "normal",
        "autoLock",
        "emergencyOpen",
        "emergencyClose",
        "holdOpen",
        "lockdown",
        null,
      ],
      description:
        "emergencyOpen and emergencyClose are deprecated and can be removed once Salto, Paxton and Geovision drivers are updated",
      default: null,
    },
    supportedModes: {
      type: "array",
      uniqueItems: true,
      items: {
        enum: [
          "normal",
          "autoLock",
          "emergencyOpen",
          "emergencyClose",
          "holdOpen",
          "lockdown",
          null,
        ],
      },
    },
    batteryLevel: {
      $ref: "definitions.json#/definitions/batteryLevel",
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
  required: ["id", "type", "state", "driver"],
};
