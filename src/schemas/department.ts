import defs, { ISODateString } from "./definitions";
import type { FromSchema } from "json-schema-to-ts";

export const departmentSchema = {
  $schema: "http://json-schema.org/draft-07/schema",
  $id: "department.json",
  title: "Department",
  description: "A division of an organization.",
  type: "object",
  required: ["id", "type", "name"],
  additionalProperties: false,
  properties: {
    id: {
      $ref: "definitions.json#/definitions/id",
    },
    type: {
      type: "string",
      enum: ["department"],
      default: "department",
    },
    name: {
      type: "string",
    },
    description: {
      type: "string",
    },
    createdAt: {
      $ref: "definitions.json#/definitions/date",
    },
    updatedAt: {
      $ref: "definitions.json#/definitions/date",
    },
    deletedAt: {
      $ref: "definitions.json#/definitions/date",
    },
  },
} as const;

export type DepartmentSchema = FromSchema<
  typeof departmentSchema,
  {
    references: [typeof defs];
    deserialize: [
      {
        pattern: {
          format: "date-time";
        };
        output: Date | ISODateString;
      },
    ];
  }
>;
