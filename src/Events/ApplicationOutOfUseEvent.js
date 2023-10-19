const Event = require("./Event");

class ApplicationOutOfUseEvent extends Event {
  constructor({ propertyId }) {
    super({ propertyId });
  }

  get name() {
    return constructor.name;
  }

  get exchange() {
    return "AppEvents";
  }

  get routingKey() {
    return `${this.data[0].organizationId || "#"}.${this.data[0].propertyId || "#"}.app.${constructor.name}`;
  }

  static get entity() {
    return "app"
  }
}

module.exports = ApplicationOutOfUseEvent;
