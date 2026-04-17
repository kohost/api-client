import defs, { ISODateString } from "./definitions";
import type { FromSchema } from "json-schema-to-ts";
import { mediaFileSchema } from "./mediaFile";

export const integrationSchema = {
  $schema: "http://json-schema.org/draft-07/schema",
  $id: "integration.json",
  title: "Integration",
  description:
    "An entry in the integrations catalog used to display and pre-fill metadata for a driver.",
  type: "object",
  required: ["id", "type", "systemName", "systemPhoto", "createdAt", "updatedAt"],
  additionalProperties: false,
  properties: {
    id: {
      type: "string",
      description:
        "The driver key (e.g. 'salto'). Lowercased on write, unique, immutable after create.",
    },
    type: {
      type: "string",
      default: "integration",
      enum: ["integration"],
    },
    systemName: {
      type: "string",
      description: "Human-readable display name shown in pickers and admin tables.",
    },
    systemPhoto: {
      $ref: "mediaFile.json#",
    },
    itunesAppId: {
      type: "string",
      description: "iOS App Store ID for the vendor's companion app.",
      example: "960998088",
    },
    googleAppId: {
      type: "string",
      description: "Google Play package ID for the vendor's companion app.",
      example: "com.saltosystems.justin",
    },
    createdAt: {
      $ref: "definitions.json#/definitions/date",
    },
    updatedAt: {
      $ref: "definitions.json#/definitions/date",
    },
  },
} as const;

export type IntegrationSchema = FromSchema<
  typeof integrationSchema,
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
