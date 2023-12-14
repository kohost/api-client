import { add, compile } from "../utils/schema";
import schema, { properties } from "../schemas/mediaFile.json";
import Entity from "./Entity";
import { RequestError } from "../Errors/error";

add(schema);
const validator = compile(schema);

type MediaFileType = import("../types/MediaFileSchema").MediaFile;
class MediaFile extends Entity {
  type: string = "mediaFile";
  constructor(mediaFile: MediaFileType) {
    super(mediaFile);
  }

  schema = schema;
  validator = validator;
  validProperties = Object.keys(properties);

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

export default MediaFile;
