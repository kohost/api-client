import { FromSchema } from "json-schema-to-ts";
import { definitionsSchema } from "../schemas/definitions";
import { createValidator, registerSchema } from "../utils/validation";
import { mediaSourceSchema } from "./../schemas/mediaSource";
import { Entity } from "./Entity";

registerSchema(mediaSourceSchema);
const validator = createValidator(mediaSourceSchema);

export type MediaSourceSchema = FromSchema<
  typeof mediaSourceSchema,
  { references: [typeof definitionsSchema] }
>;

export class MediaSource extends Entity<MediaSourceSchema> {
  static schema = mediaSourceSchema;
  validator = validator;

  constructor(data: MediaSourceSchema) {
    super(data);
  }
}
