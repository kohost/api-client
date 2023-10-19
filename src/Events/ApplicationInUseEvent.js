const Event = require("./Event");

class ApplicationInUseEvent extends Event {
  constructor({ propertyId, organizationId, ...rest }) {
    if (!propertyId)
      throw new Error("propertyId is required for ApplicationInUseEvent");
    super({ propertyId, organizationId, ...rest });
    this._propertyId = propertyId;
    this._organizationId = organizationId;
  }

  get name () {
    return "ApplicationInUse"; 
  }

  get exchange() {
    return "AppEvents";
  }

  get routingKey() {
    return `${this.organizationId || "#"}.${this._propertyId}.app.ApplicationInUse`;
  }

  static get entity() {
    return "app"
  }

  
}

module.exports = ApplicationInUseEvent;
