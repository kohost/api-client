const Event = require("./Event");

class ApplicationInUseEvent extends Event {
  constructor({ propertyId }) {
    super({ propertyId });
  }

  get name() {
    return "ApplicationInUse";
  }

  get routingKey() {
    return `app.${this.data[0].propertyId}.inUse`;
  }
}

module.exports = ApplicationInUseEvent;
