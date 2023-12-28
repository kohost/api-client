import schemas from "../utils/schema";
import schema from "../schemas/announcement.json";
import Entity from "./Entity";
import { AnnouncementSchema } from "../types/AnnouncementSchema";

schemas.add(schema);
const validator = schemas.compile(schema);

class Announcement extends Entity {
  constructor(announcement: AnnouncementSchema) {
    super(announcement);
  }

  schema = schema;
  validator = validator;
  validProperties = Object.keys(schema.properties);
}

export default Announcement;
