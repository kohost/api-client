import defs, { ISODateString } from "./definitions";
import type { FromSchema } from "json-schema-to-ts";

export const categorySchema = {
  $schema: "http://json-schema.org/draft-07/schema",
  $id: "category.json",
  title: "Category",
  type: "object",
  required: ["id", "type", "discriminator"],
  properties: {
    id: {
      $ref: "definitions.json#/definitions/id",
    },
    propertyId: {
      type: "string",
      description:
        "ID of the property this entity belongs to. Optional — used as a per-document filter inside the org-scoped database.",
    },
    type: {
      type: "string",
      enum: ["category"],
      default: "category",
    },
    name: {
      type: "string",
      minLength: 1,
    },
    driver: {
      $ref: "definitions.json#/definitions/driver",
    },
    description: {
      type: "string",
    },
    image: {
      $ref: "mediaFile.json",
    },
    rating: {
      type: "number",
      minimum: 0,
      maximum: 10,
      default: 9,
    },
    discriminator: {
      type: "string",
      enum: ["space", "product", "mediaFile", "property", "user", "resource"],
    },
    iconKey: {
      type: "string",
      minLength: 1,
      description:
        "Key into the app's curated icon gallery for this category's discriminator, selecting the glyph shown beside the name. Used by `resource` categories; the app falls back to a default glyph when unset or unrecognized.",
    },
    color: {
      type: ["string", "null"],
      pattern: "^#[0-9a-fA-F]{6}$",
      description:
        "Accent color for the category as a hex value, e.g. #3B93F0",
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
  additionalProperties: false,
} as const;

export type CategorySchema = FromSchema<
  typeof categorySchema,
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
