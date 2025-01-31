export default {
  $schema: "http://json-schema.org/draft-07/schema",
  $id: "log.json",
  title: "Log",
  type: "object",
  required: ["type", "timestamp", "id", "driver", "name"],
  properties: {
    type: {
      type: "string",
      default: "log",
      enum: ["log"],
    },
    timestamp: {
      type: "number",
      minimum: 1655907956593,
    },
    id: {
      $ref: "definitions.json#/definitions/id",
    },
    driver: {
      $ref: "definitions.json#/definitions/driver",
    },
    name: {
      type: "string",
      description: "Event name",
    },
    field1: {
      type: "object",
      required: ["name", "value"],
      properties: {
        name: {
          type: "string",
        },
        value: {
          type: "string",
        },
      },
    },
    field2: {
      type: "object",
      required: ["name", "value"],
      properties: {
        name: {
          type: "string",
        },
        value: {
          type: "string",
        },
      },
    },
    field3: {
      type: "object",
      required: ["name", "value"],
      properties: {
        name: {
          type: "string",
        },
        value: {
          type: "string",
        },
      },
    },
    field4: {
      type: "object",
      required: ["name", "value"],
      properties: {
        name: {
          type: "string",
        },
        value: {
          type: "string",
        },
      },
    },
    field5: {
      type: "object",
      required: ["name", "value"],
      properties: {
        name: {
          type: "string",
        },
        value: {
          type: "string",
        },
      },
    },
    field6: {
      type: "object",
      required: ["name", "value"],
      properties: {
        name: {
          type: "string",
        },
        value: {
          type: "string",
        },
      },
    },
  },
};
