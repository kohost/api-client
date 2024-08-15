import { FromSchema } from "json-schema-to-ts";
import { definitionsSchema } from "../schemas/definitions";
import { createValidator, registerSchema } from "../utils/validation";
import { shortLinkSchema } from "./../schemas/shortLink";
import { Entity } from "./Entity";

registerSchema(shortLinkSchema);
const validator = createValidator(shortLinkSchema);

export type ShortLinkSchema = FromSchema<
  typeof shortLinkSchema,
  { references: [typeof definitionsSchema] }
>;

export class ShortLink extends Entity<ShortLinkSchema> {
  static schema = shortLinkSchema;
  validator = validator;
}
