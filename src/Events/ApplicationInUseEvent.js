const Event = require("./Event");

class ApplicationInUseEvent extends Event {
  constructor({ propertyId, organizationId, ...rest }) {
    if (!propertyId)
      throw new Error("propertyId is required for ApplicationInUseEvent");
    super({ propertyId, organizationId, ...rest });
    this._propertyId = propertyId;
    this._organizationId = organizationId;
  }

  get name() {
    return "ApplicationInUse";
  }

  get exchange() {
    return "AppEvents";
  }

  get routingKey() {
    return `app.${this._propertyId}.inUse`;
  }
}

module.exports = ApplicationInUseEvent;
