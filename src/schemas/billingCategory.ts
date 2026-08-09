import defs, { ISODateString } from "./definitions";
import type { FromSchema } from "json-schema-to-ts";

export const billingCategorySchema = {
  $schema: "http://json-schema.org/draft-07/schema",
  $id: "billingCategory.json",
  title: "Billing Category",
  description:
    "A label in the global, KFC-maintained billing category library, picked per bill line while drafting (e.g. \"HVAC System Maintenance/Repair\"). Named distinctly from the generic `category` schema (space/product/media discriminators). Archived, never deleted.",
  type: "object",
  required: ["id", "name"],
  additionalProperties: false,
  properties: {
    id: {
      $ref: "definitions.json#/definitions/id",
      description: "Unique identifier for the Billing Category.",
    },
    name: {
      type: "string",
      minLength: 1,
      description:
        "Display name shown in the drafting picker and on bill lines/PDFs. Renames apply to drafts; sent bills keep their snapshotted name.",
    },
    archived: {
      type: "boolean",
      default: false,
      description:
        "Archived categories leave the drafting picker but a draft line already holding one stays valid at send. Archive instead of delete: a category may be referenced by sent bills forever.",
    },
    createdAt: {
      $ref: "definitions.json#/definitions/date",
      description: "When the Billing Category was created.",
    },
    updatedAt: {
      $ref: "definitions.json#/definitions/date",
      description: "When the Billing Category was last modified.",
    },
  },
} as const;

export type BillingCategorySchema = FromSchema<
  typeof billingCategorySchema,
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
