import schemas from "../utils/schema";
import schema from "../schemas/announcement.json";
import Entity from "./Entity";

schemas.add(schema);
const validator = schemas.compile(schema);

type AnnouncementType = import("../types/AnnouncementSchema").Announcement;

class Announcement extends Entity {
  constructor(announcement: AnnouncementType) {
    super(announcement);
  }

  schema = schema;
  validator = validator;
  validProperties = Object.keys(schema.properties);
}

export default Announcement;
