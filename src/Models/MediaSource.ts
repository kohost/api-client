// create the Media Source Model
import { add, compile } from "../utils/schema";
import schema, { properties } from "../schemas/mediaSource.json";
import Entity from "./Entity";

add(schema);
const validator = compile(schema);

type MediaSourceSchema = import("../types/MediaSourceSchema").MediaSourceSchema;

class MediaSource extends Entity {
  constructor(mediaSource: MediaSourceSchema) {
    super(mediaSource);
  }

  schema = schema;
  validator = validator;
  validProperties = Object.keys(properties);

  static get actionProperties() {
    return ["power", "volume", "input", "command"];
  }
}

export default MediaSource;
