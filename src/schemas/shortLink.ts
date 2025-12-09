import defs from "./definitions";
import type { FromSchema } from "json-schema-to-ts";

export const shortLinkSchema = {
  $schema: "http://json-schema.org/draft-07/schema",
  $id: "shortLink.json",
  title: "Short Link",
  type: "object",
  required: ["destination", "url"],
  properties: {
    id: {
      $ref: "definitions.json#/definitions/id",
    },
    type: {
      type: "string",
      default: "shortLink",
      enum: ["shortLink"],
    },
    title: {
      type: "string",
    },
    destination: {
      type: "string",
      format: "uri",
    },
    url: {
      type: "string",
      format: "uri",
    },
    systemId: {
      $ref: "definitions.json#/definitions/systemId",
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

export type ShortLinkSchema = FromSchema<
  typeof shortLinkSchema,
  { references: [typeof defs] }
>;
