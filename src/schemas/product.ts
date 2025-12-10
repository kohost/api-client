import defs, { ISODateString } from "./definitions";
import type { FromSchema } from "json-schema-to-ts";

export const productSchema = {
  $schema: "http://json-schema.org/draft-07/schema",
  $id: "product.json",
  title: "Product",
  type: "object",
  required: ["name", "price", "driver"],
  properties: {
    id: {
      $ref: "definitions.json#/definitions/id",
    },
    type: {
      type: "string",
      default: "product",
      enum: ["product"],
    },
    name: {
      type: "string",
    },
    driver: {
      $ref: "definitions.json#/definitions/driver",
    },
    description: {
      type: "string",
    },
    price: {
      type: "number",
    },
    tax: {
      type: ["number", "null"],
    },
    image: {
      $ref: "mediaFile.json",
    },
    category: {
      type: "string",
    },
    imageUrl: {
      type: "string",
      format: "uri",
      pattern: "^https?://",
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

export type ProductSchema = FromSchema<
  typeof productSchema,
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
