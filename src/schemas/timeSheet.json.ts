import { type Definitions } from "./definitions.json";
const timeEntryDiscriminators = ["working", "driving", "meeting"] as const;
export const schema = {
  $schema: "http://json-schema.org/draft-07/schema",
  $id: "timeSheet.json",
  title: "Time Sheet",
  type: "object",
  required: ["userId", "day"],
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
            enum: timeEntryDiscriminators,
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
  },
} as const;

type TimeEntryDiscriminator = (typeof timeEntryDiscriminators)[number];

export interface TimeEntry {
  id?: Definitions["id"];
  discriminator: TimeEntryDiscriminator;
  start: Definitions["date"];
  end?: Definitions["date"];
  comment?: string;
  ticketId?: string;
}

export interface TimeSheetSchema {
  id?: Definitions["id"];
  type: "timeSheet";
  userId: Definitions["id"];
  day: Definitions["date"];
  locked?: boolean;
  timeEntries: TimeEntry[];
}
