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
      $ref: "definitions.json#/definitions/type",
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
      enum: ["normal", "autoLock", "emergencyOpen", "emergencyClose", null],
      description:
        "AutoLock: Lock automatically locks after set time. Normal - Lock needs told to lock or unlock.",
      default: "normal",
    },
    supportedModes: {
      type: "array",
      uniqueItems: true,
      items: {
        enum: ["normal", "autoLock", "emergencyOpen", "emergencyClose"],
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
  },
  required: ["id", "type", "state", "driver"],
};
