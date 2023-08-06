const schemas = require("../utils/schema");
const schema = require("../schemas/notification.json");
const Kohost = require("./Kohost");

schemas.add(schema);
const validator = schemas.compile(schema);

class Notification extends Kohost {
  /**
   * @typedef {import("../schemas/NotificationSchema").Notification} NotificationType
   * Create a Notification instance.
   * @constructor
   * @param {NotificationType} property - The property object of type Notification.
   */
  constructor(notification) {
    super(notification);
  }
}

Object.defineProperty(Notification.prototype, "schema", {
  value: schema,
});

Object.defineProperty(Notification.prototype, "validator", {
  get: function () {
    return validator;
  },
});

Object.defineProperty(Notification, "validProperties", {
  value: Object.keys(schema.properties),
});

module.exports = Notification;
