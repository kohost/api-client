import defs, { ISODateString } from "./definitions";
import type { FromSchema } from "json-schema-to-ts";

export const groupSchema = {
  $schema: "http://json-schema.org/draft-07/schema",
  $id: "group.json",
  title: "Group",
  description: "A named collection of members.",
  type: "object",
  required: ["id", "type", "discriminator"],
  additionalProperties: false,
  properties: {
    id: {
      $ref: "definitions.json#/definitions/id",
    },
    systemId: {
      $ref: "definitions.json#/definitions/systemId",
    },
    driver: {
      $ref: "definitions.json#/definitions/driver",
    },
    type: {
      type: "string",
      enum: ["group"],
      default: "group",
    },
    discriminator: {
      type: "string",
      enum: [
        "social",
        "department",
      ],
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
