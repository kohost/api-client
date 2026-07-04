import defs, { ISODateString } from "./definitions";
import type { FromSchema } from "json-schema-to-ts";

export const sosTypeSchema = {
  $schema: "http://json-schema.org/draft-07/schema",
  $id: "sosType.json",
  title: "SOS Type",
  description:
    "A customizable emergency category in an organization's SOS library.",
  type: "object",
  required: ["id", "name", "nameKey", "iconKey", "scope"],
  additionalProperties: false,
  properties: {
    id: {
      $ref: "definitions.json#/definitions/id",
      description: "Unique identifier for the SOS Type.",
    },
    name: {
      type: "string",
      minLength: 1,
      description:
        "Display name of the emergency category, rendered on the panic-grid tile (e.g. \"Medical\", \"Lockdown\").",
    },
    nameKey: {
      type: "string",
      minLength: 1,
      description:
        "Normalized name (trimmed, whitespace-collapsed, lowercased) used for case-insensitive uniqueness within the organization's library. Derived from `name` on create; unique among non-deleted types.",
    },
    iconKey: {
      type: "string",
      minLength: 1,
      description:
        "Key into the app's curated SOS icon gallery, selecting the glyph shown on the tile.",
    },
    scope: {
      type: "object",
      description:
        "Where this SOS Type is offered: an org-wide `default` plus a sparse map of per-Property overrides. Mirrors an Issue's routing shape; `false` suppresses, an absent key inherits `default`.",
      additionalProperties: false,
      properties: {
        default: {
          type: "boolean",
          default: false,
          description:
            "Org-wide baseline: whether the type is offered at Properties with no override, including Properties added later.",
        },
        properties: {
          type: "object",
          additionalProperties: {
            type: "boolean",
          },
          default: {},
          description:
            "Sparse per-Property overrides keyed by Property ID: `true` opts in, `false` opts out, an absent key inherits `default`.",
        },
      },
    },
    createdAt: {
      $ref: "definitions.json#/definitions/date",
      description: "When the SOS Type was created.",
    },
    updatedAt: {
      $ref: "definitions.json#/definitions/date",
      description: "When the SOS Type was last modified.",
    },
    deletedAt: {
      type: ["string", "object", "null"],
      format: "date-time",
      description:
        "Soft-delete tombstone. Deleted types are hidden from the library and release their `nameKey` for reuse.",
    },
  },
} as const;

export type SOSTypeSchema = FromSchema<
  typeof sosTypeSchema,
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
