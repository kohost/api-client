const Event = require("./Event");

class ApplicationOutOfUseEvent extends Event {
  constructor({ propertyId }) {
    super({ propertyId });
  }

  get name() {
    return "ApplicationOutOfUseEvent";
  }

  get exchange() {
    return "AppEvents";
  }

  get routingKey() {
    return `${this.data[0].organizationId || "#"}.${this.data[0].propertyId || "#"}.app.ApplicationOutOfUseEvent`;
  }

  static get entity() {
    return "app"
  }
}

module.exports = ApplicationOutOfUseEvent;
