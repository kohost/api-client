// create the Media Source Model
import { registerSchema, compileSchema } from "../utils/schema";
import { schema, type MediaSourceSchema } from "../schemas/mediaSource.json";
import Entity from "./Entity";

registerSchema(schema);

interface MediaSource extends MediaSourceSchema {}

class MediaSource extends Entity {
  constructor(mediaSource: MediaSourceSchema) {
    super(mediaSource);
  }
}

MediaSource.schema = schema;
MediaSource.validator = compileSchema(schema);
MediaSource.validProperties = Object.keys(schema.properties);
MediaSource.actionProperties = ["power", "volume", "input", "command"];

export default MediaSource;
