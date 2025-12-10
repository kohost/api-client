import defs, { ISODateString } from "./definitions";
import type { FromSchema } from "json-schema-to-ts";
import { mediaFileSchema } from "./mediaFile";

export const vendorSchema = {
  $schema: "http://json-schema.org/draft-07/schema",
  $id: "vendor.json",
  title: "Vendor",
  type: "object",
  required: ["id", "name", "email"],
  additionalProperties: false,
  properties: {
    id: {
      $ref: "definitions.json#/definitions/id",
    },
    type: {
      type: "string",
      default: "vendor",
      enum: ["vendor"],
    },
    name: {
      type: "string",
    },
    phone: {
      type: ["string", "null"],
      pattern: "^\\+[0-9]{1,14}$",
    },
    email: {
      type: ["string", "null"],
      format: "email",
    },
    address: {
      $ref: "definitions.json#/definitions/address",
    },
    photo: {
      $ref: "mediaFile.json#",
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

export type VendorSchema = FromSchema<
  typeof vendorSchema,
  {
    references: [typeof defs, typeof mediaFileSchema];
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
