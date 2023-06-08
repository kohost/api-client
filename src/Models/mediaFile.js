const schemas = require("../utils/schema");
const schema = require("../schemas/mediaFile.json");
const Kohost = require("./kohost");
const { RequestError } = require("../Errors");

schemas.add(schema);
const validator = schemas.compile(schema);

class MediaFile extends Kohost {
  constructor(data) {
    super(data);
  }

  createImageVariant(params) {
    if (this.mimeType != "image/*")
      throw new RequestError("Only dynamic images can have variants");
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
  value: Object.keys(schema.properties),
});

module.exports = MediaFile;
