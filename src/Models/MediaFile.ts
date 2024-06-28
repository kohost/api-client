import { FromSchema } from "json-schema-to-ts";
import { definitionsSchema } from "../schemas/definitions";
import { createValidator, registerSchema } from "../utils/validation";
import { mediaFileSchema } from "./../schemas/mediaFile";
import { Entity } from "./Entity";

registerSchema(mediaFileSchema);
const validator = createValidator(mediaFileSchema);

export type MediaFileSchema = FromSchema<
  typeof mediaFileSchema,
  { references: [typeof definitionsSchema] }
>;

export class MediaFile extends Entity<MediaFileSchema> {
  static schema = mediaFileSchema;
  validator = validator;

  constructor(data: MediaFileSchema) {
    super(data);
  }

  createImageVariant(params): string | null {
    if (this.data.mimeType != "image/*")
      throw new Error("Only dynamic images can have variants");
    if (!this.data.url) throw new Error("MediaFile has no url");
    // convert params to "key=value" pairs
    const query = Object.keys(params)
      .map((key) => `${key}=${params[key]}`)
      .join(",");

    // replace the final /public with the query above
    return this.data.url?.replace(/\/public$/, `/${query}`) || null;
  }
}
