import defs, { ISODateString } from "./definitions";
import type { FromSchema } from "json-schema-to-ts";

export const groupSchema = {
  $schema: "http://json-schema.org/draft-07/schema",
  $id: "group.json",
  title: "Group",
  description:
    "A named collection of members. Conforms to SCIM 2.0 (RFC 7643) Group resource.",
  type: "object",
  required: ["id", "type", "kind", "name"],
  additionalProperties: false,
  properties: {
    id: {
      $ref: "definitions.json#/definitions/id",
    },
    systemId: {
      $ref: "definitions.json#/definitions/systemId",
    },
    type: {
      type: "string",
      enum: ["group"],
      default: "group",
    },
    kind: {
      type: "string",
      enum: ["Household", "Department"],
    },
    name: {
      type: "string",
    },
    members: {
      type: "array",
      items: {
        type: "object",
        required: ["id", "type"],
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
            description: "The type of the member resource.",
          },
          role: {
            type: "string",
            description: "The role of the member within this group.",
          },
        },
      },
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

export type GroupSchema = FromSchema<
  typeof groupSchema,
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
