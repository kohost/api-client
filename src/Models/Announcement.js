const schemas = require("../utils/schema");
const schema = require("../schemas/announcement.json");
const Entity = require("./Entity");

schemas.add(schema);
const validator = schemas.compile(schema);

class Announcement extends Entity {
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
  value: Object.keys(schema.properties),
});

module.exports = Announcement;
