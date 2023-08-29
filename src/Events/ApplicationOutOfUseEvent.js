const Event = require("./Event");

class ApplicationOutOfUseEvent extends Event {
  constructor({ propertyId }) {
    super({ propertyId });
  }

  get name() {
    return "ApplicationOutOfUse";
  }

  get exchange() {
    return "AppEvents";
  }

  get routingKey() {
    return `app.${this.data[0].propertyId}.notInUse`;
  }
}

module.exports = ApplicationOutOfUseEvent;
