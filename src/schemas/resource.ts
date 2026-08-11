import defs, { ISODateString } from "./definitions";
import type { mediaFileSchema } from "./mediaFile";
import type { FromSchema } from "json-schema-to-ts";

export const resourceSchema = {
  $schema: "http://json-schema.org/draft-07/schema",
  $id: "resource.json",
  title: "Resource",
  description:
    "An entry in the organization's resource library — an uploaded file or an external link.",
  type: "object",
  required: ["id", "type", "discriminator", "name", "scope"],
  properties: {
    id: {
      $ref: "definitions.json#/definitions/id",
    },
    type: {
      type: "string",
      enum: ["resource"],
      default: "resource",
    },
    discriminator: {
      type: "string",
      enum: ["file", "link"],
      description:
        "Which payload the resource carries: `file` an uploaded document in `media`, `link` an external address in `url`.",
    },
    name: {
      type: "string",
      minLength: 1,
      description:
        "Display name. A file resource defaults to its filename at creation and is editable independently of it.",
    },
    description: {
      type: "string",
    },
    url: {
      type: "string",
      format: "uri",
      description: "The external address a `link` resource points at.",
    },
    media: {
      $ref: "mediaFile.json",
      description: "The uploaded document a `file` resource carries.",
    },
    preview: {
      type: "object",
      additionalProperties: false,
      required: ["url"],
      description:
        "The generated Open Graph preview image for a `link` resource, stored in the file store's org tier. Written by the system after the link is saved, never by the caller.",
      properties: {
        url: {
          type: "string",
          format: "uri",
        },
        width: {
          type: "number",
        },
        height: {
          type: "number",
        },
      },
    },
    categoryIds: {
      type: "array",
      items: {
        type: "string",
      },
      default: [],
      description:
        "The `resource` categories this resource appears under. Empty means uncategorized.",
    },
    scope: {
      type: "object",
      description:
        "Where this resource is available: an org-wide `default` plus a sparse map of per-Property overrides. Mirrors an SOS Type's scope; `false` suppresses, an absent key inherits `default`.",
      additionalProperties: false,
      properties: {
        default: {
          type: "boolean",
          default: false,
          description:
            "Org-wide baseline: whether the resource is available at Properties with no override, including Properties added later.",
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
    createdBy: {
      type: "object",
      additionalProperties: false,
      required: ["id", "discriminator", "name"],
      description:
        "Who added the resource, embedded at creation so the library shows provenance without a join.",
      properties: {
        id: {
          type: "string",
        },
        discriminator: {
          type: "string",
          enum: ["user", "system"],
        },
        name: {
          type: "string",
        },
        photo: {
          anyOf: [
            {
              $ref: "mediaFile.json",
            },
            {
              type: "null",
            },
            {
              type: "string",
            },
          ],
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
  additionalProperties: false,
} as const;

export type ResourceSchema = FromSchema<
  typeof resourceSchema,
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
