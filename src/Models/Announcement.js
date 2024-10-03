import schema, { properties } from "../schemas/announcement.json";
import { add, compile } from "../utils/schema";
import { Entity } from "./Entity";

add(schema);
const validator = compile(schema);

export class Announcement extends Entity {
  /**
   * @typedef {import("../schemas/AnnouncementSchema").Announcement} AnnouncementType
   * Create a Announcement instance.
   * @constructor
   * @param {AnnouncementType} property - The property object of type Announcement.
   */
  constructor(announcement) {
    super(announcement);
  }
}

Object.defineProperty(Announcement.prototype, "schema", {
  value: schema,
});

Object.defineProperty(Announcement.prototype, "validator", {
  get: function () {
    return validator;
  },
});

Object.defineProperty(Announcement, "validProperties", {
  value: Object.keys(properties),
});
