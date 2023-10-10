const Event = require("./Event");

class ApplicationInUseEvent extends Event {
  constructor({ propertyId, organizationId, ...rest }) {
    if (!propertyId && !organizationId)
      throw new Error(
        "propertyId or organizationId required for ApplicationInUseEvent"
      );
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
    if (this._propertyId) return `app.${this._propertyId}.inUse`;
    else return `app.org.${this._organizationId}.inUse`;
  }
}

module.exports = ApplicationInUseEvent;
