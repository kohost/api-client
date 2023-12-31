import { registerSchema, compileSchema } from "../utils/schema";
import { schema, type MediaFileSchema } from "../schemas/mediaFile.json";
import Entity from "./Entity";
import RequestError from "../Errors/RequestError";

registerSchema(schema);
const validator = compileSchema(schema);

interface MediaFile extends MediaFileSchema {}

class MediaFile extends Entity {
  constructor(mediaFile: MediaFileSchema) {
    super(mediaFile);
  }

  createImageVariant(params: any) {
    if (this.mimeType != "image/*")
      throw new RequestError("Only dynamic images can have variants");
    if (!this.url) throw new RequestError("MediaFile has no url");
    // convert params to "key=value" pairs
    const query = Object.keys(params)
      .map((key) => `${key}=${params[key]}`)
      .join(",");

    // replace the final /public with the query above
    return this.url.replace(/\/public$/, `/${query}`);
  }
}

MediaFile.validator = validator;
MediaFile.schema = schema;
MediaFile.validProperties = Object.keys(schema.properties);

export default MediaFile;
