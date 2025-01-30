export default {
  $schema: "http://json-schema.org/draft-07/schema",
  $id: "energyReport.json",
  title: "Energy Report",
  description: "Hourly Report for Energy based on energy report shards",
  type: "object",
  required: [
    "id",
    "type",
    "roomId",
    "first",
    "last",
    "consumption",
    "totals",
    "costPerKw",
  ],
  properties: {
    id: {
      $ref: "definitions.json#/definitions/id",
    },
    type: {
      type: "string",
      enum: ["energyReport"],
      default: "energyReport",
    },
    reportTime: {
      type: "string",
      enum: ["hourly", "daily", "monthly"],
    },
    roomId: {
      $ref: "definitions.json#/definitions/id",
    },
    first: {
      type: ["string", "object"],
      format: "date-time",
    },
    last: {
      type: ["string", "object"],
      format: "date-time",
    },
    consumption: {
      type: "array",
      items: {
        type: "object",
        required: ["id", "type", "kwh"],
        properties: {
          id: {
            $ref: "definitions.json#/definitions/id",
          },
          type: {
            $ref: "definitions.json#/definitions/type",
          },
          kwh: {
            type: "number",
            minimum: 0,
          },
        },
      },
    },
    totals: {
      type: "array",
      items: {
        type: "object",
        required: ["lights", "climate", "media"],
        properties: {
          lights: {
            type: "number",
            minimum: 0,
          },
          climate: {
            type: "number",
            minimum: 0,
          },
          media: {
            type: "number",
            minimum: 0,
          },
        },
      },
    },
    costPerKw: {
      type: "number",
      minimum: 0,
    },
  },
};
