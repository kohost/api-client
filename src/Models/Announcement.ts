import { registerSchema, compileSchema } from "../utils/schema";
import { schema, type AnnouncementSchema } from "../schemas/announcement.json";
import Entity from "./Entity";

registerSchema(schema);

interface Announcement extends AnnouncementSchema {}

class Announcement extends Entity {
  constructor(announcement: AnnouncementSchema) {
    super(announcement);
  }
}

Announcement.validator = compileSchema(schema);
Announcement.schema = schema;
Announcement.validProperties = Object.keys(schema.properties);

export default Announcement;
