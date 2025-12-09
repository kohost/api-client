import defs from "./definitions";
import type { FromSchema } from "json-schema-to-ts";

export const energyReportShardSchema = {
  $schema: "http://json-schema.org/draft-07/schema",
  $id: "energyReportShard.json",
  title: "Energy Report Shard",
  description: "Shard used for Energy Reports",
  type: "object",
  required: [
    "id",
    "type",
    "roomId",
    "first",
    "last",
    "data",
    "ndata",
    "expires",
  ],
  properties: {
    id: {
      $ref: "definitions.json#/definitions/id",
    },
    type: {
      type: "string",
      enum: ["energyReportShard"],
      default: "energyReportShard",
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
    data: {
      type: "array",
      items: {
        type: "object",
        required: ["time", "watts", "id", "type", "value"],
        properties: {
          time: {
            type: ["string", "object"],
            format: "date-time",
          },
          watts: {
            $ref: "definitions.json#/definitions/watts",
          },
          id: {
            $ref: "definitions.json#/definitions/id",
          },
          type: {
            $ref: "definitions.json#/definitions/type",
          },
          value: {
            type: "number",
            minimum: 0,
            maximum: 1,
          },
        },
      },
    },
    ndata: {
      type: "integer",
      minimum: 0,
      maximum: 100000,
      default: 0,
    },
    expires: {
      type: ["string", "object"],
      format: "date-time",
    },
  },
} as const;

export type EnergyReportShardSchema = FromSchema<
  typeof energyReportShardSchema,
  { references: [typeof defs] }
>;
