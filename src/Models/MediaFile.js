import { RequestError } from "../Errors";
import schema, { properties } from "../schemas/mediaFile.json";
import { add, compile } from "../utils/schema";
import { Entity } from "./Entity";

add(schema);
const validator = compile(schema);

export class MediaFile extends Entity {
  /**
   * @typedef {import("../schemas/MediaFileSchema").MediaFile} MediaFileType
   * Create a MediaFile instance.
   * @constructor
   * @param {MediaFileType} mediaFile - The mediaFile object of type MediaFile.
   */
  constructor(mediaFile) {
    super(mediaFile);
  }

  createImageVariant(params) {
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

Object.defineProperty(MediaFile.prototype, "schema", {
  value: schema,
});

Object.defineProperty(MediaFile.prototype, "validator", {
  get: function () {
    return validator;
  },
});

Object.defineProperty(MediaFile, "validProperties", {
  value: Object.keys(properties),
});
