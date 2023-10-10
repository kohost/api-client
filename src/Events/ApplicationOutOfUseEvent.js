const Event = require("./Event");

class ApplicationOutOfUseEvent extends Event {
  constructor({ propertyId, organizationId, ...rest }) {
    if (!propertyId && !organizationId)
      throw new Error(
        "propertyId or organizationId required for ApplicationOutOfUseEvent"
      );
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
    if (this._propertyId) return `app.${this._propertyId}.outOfUse`;
    else return `app.org.${this._organizationId}.outOfUse`;
  }
}

module.exports = ApplicationOutOfUseEvent;
