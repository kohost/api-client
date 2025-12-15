import defs, { ISODateString } from "./definitions";
import type { FromSchema } from "json-schema-to-ts";

export const timeSheetSchema = {
  $schema: "http://json-schema.org/draft-07/schema",
  $id: "timeSheet.json",
  title: "Time Sheet",
  type: "object",
  required: ["id", "type", "userId", "day"],
  properties: {
    id: {
      $ref: "definitions.json#/definitions/id",
    },
    type: {
      type: "string",
      default: "timeSheet",
      enum: ["timeSheet"],
    },
    userId: {
      $ref: "definitions.json#/definitions/id",
    },
    day: {
      type: ["string", "object"],
      format: "date-time",
    },
    locked: {
      type: "boolean",
      default: false,
      description: "If true, the time sheet is locked and cannot be modified",
    },
    timeEntries: {
      type: "array",
      default: [],
      items: {
        type: "object",
        properties: {
          id: {
            $ref: "definitions.json#/definitions/id",
          },
          discriminator: {
            type: "string",
            enum: ["working", "driving", "meeting", "break"],
          },
          start: {
            type: ["string", "object"],
            format: "date-time",
          },
          end: {
            type: ["string", "object"],
            format: "date-time",
          },
          comment: {
            type: "string",
          },
          ticketId: {
            type: "string",
          },
        },
        required: ["start", "discriminator"],
        additionalProperties: false,
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

export type TimeSheetSchema = FromSchema<
  typeof timeSheetSchema,
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
