import { type Definitions } from "./definitions.json";
import { type MediaFileSchema } from "./mediaFile.json";

export const schema = {
  $schema: "http://json-schema.org/draft-07/schema",
  $id: "announcement.json",
  title: "Announcement",
  description: "Announcement message sent to users",
  type: "object",
  properties: {
    id: { $ref: "definitions.json#/definitions/id" },
    type: {
      $ref: "definitions.json#/definitions/type",
      default: "announcement",
    },
    users: {
      type: "array",
      items: {
        type: "string",
      },
      minItems: 1,
    },
    group: {
      type: "string",
    },
    body: {
      type: "string",
    },
    media: {
      $ref: "mediaFile.json",
    },
    sentBy: {
      type: "string",
    },
    tags: {
      type: "array",
      items: {
        type: "string",
      },
    },
    createdAt: {
      $ref: "definitions.json#/definitions/date",
    },
    updatedAt: {
      $ref: "definitions.json#/definitions/date",
    },
  },
  additionalProperties: false,
};

export type AnnouncementSchema = {
  id: Definitions["id"];
  type: "announcement";
  users: string[];
  group?: string;
  body: string;
  media?: MediaFileSchema;
  sentBy: string;
  tags?: string[];
  createdAt: Definitions["date"];
  updatedAt: Definitions["date"];
};
