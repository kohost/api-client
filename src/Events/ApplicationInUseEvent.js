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
    return constructor.name; 
  }

  get exchange() {
    return "AppEvents";
  }

  get routingKey() {
    return `${this.organizationId || "#"}.${this._propertyId}.app.${constructor.name}`;
  }

  static get entity() {
    return "app"
  }

  
}

module.exports = ApplicationInUseEvent;
