import { FromSchema } from "json-schema-to-ts";
import { definitionsSchema } from "../schemas/definitions";
import { createValidator, registerSchema } from "../utils/validation";
import { announcementSchema } from "./../schemas/announcement";
import { mediaFileSchema } from "./../schemas/mediaFile";
import { Entity } from "./Entity";

registerSchema(definitionsSchema);
registerSchema(mediaFileSchema);
registerSchema(announcementSchema);

const validator = createValidator(announcementSchema);

export type AnnouncementSchema = FromSchema<
  typeof announcementSchema,
  { references: [typeof definitionsSchema, typeof mediaFileSchema],  }
>;

export class Announcement extends Entity<AnnouncementSchema> {
  static schema = announcementSchema;
  validator = validator;
}

export default Announcement;
