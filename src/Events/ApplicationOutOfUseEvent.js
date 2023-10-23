const Event = require("./Event");

class ApplicationOutOfUseEvent extends Event {
  constructor({ propertyId, organizationId, ...rest }) {
    if (!propertyId)
      throw new Error("propertyId required for ApplicationOutOfUseEvent");
    super({ propertyId, organizationId, ...rest });
    this._propertyId = propertyId;
    this._organizationId = organizationId;
  }

  get name() {
    return "ApplicationOutOfUse";
  }

  get exchange() {
    return "AppEvents";
  }

  get routingKey() {
    return `app.${this._propertyId}.outOfUse`;
  }
}

module.exports = ApplicationOutOfUseEvent;
