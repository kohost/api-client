export default {
  $schema: "http://json-schema.org/draft-07/schema",
  $id: "alarm.json",
  title: "Alarm",
  description: "Any smart alarm system",
  type: "object",
  required: ["id", "type", "areas", "zones", "driver"],
  additionalProperties: false,
  properties: {
    id: {
      $ref: "definitions.json#/definitions/id",
    },
    name: {
      type: "string",
      description: "Name of the alarm",
    },
    offline: {
      type: "boolean",
    },
    type: {
      type: "string",
      enum: ["alarm"],
      default: "alarm",
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
    driver: {
      $ref: "definitions.json#/definitions/driver",
    },
    areas: {
      type: "array",
      items: {
        type: "object",
        properties: {
          number: {
            type: "number",
          },
          name: {
            type: "string",
          },
          securityMode: {
            type: ["string", "null"],
            enum: [
              "arming",
              "disarming",
              "armed",
              "disarmed",
              "intrusion",
              "fire",
              "medical",
              null,
            ],
          },
        },
        additionalProperties: false,
      },
    },
    zones: {
      type: "array",
      items: {
        type: "object",
        properties: {
          number: {
            type: "number",
            minimum: 0,
          },
          name: {
            type: "string",
          },
          secure: {
            type: ["boolean", "null"],
          },
          bypassed: {
            type: ["boolean", "null"],
          },
        },
        additionalProperties: false,
      },
    },
    chime: {
      type: "boolean",
      description: "Reflects whether console chime is enabled",
    },
    watts: {
      $ref: "definitions.json#/definitions/watts",
    },
    icon: {
      type: "string",
    },
    manufacturer: {
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
    address: {
      $ref: "definitions.json#/definitions/address",
    },
  },
};
