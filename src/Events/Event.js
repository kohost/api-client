const exchanges = require("../defs/amqpExchanges");

class Event {
  constructor(data, context = {}) {
    this.data = [];
    this.context = context;
    if (!data) throw new Error("Event data is required");
    if (typeof data !== "object" && !Array.isArray(data))
      throw new Error("Event data must be an object or array");

    if (!Array.isArray(data)) this.data = [data];
    else this.data = data;
  }

  get organizationId() {
    return this.context.organizationId || "*";
  }

  get propertyId() {
    return this.context.propertyId || "*";
  }

  static get type() {
    return "Event";
  }

  static get exchange() {
    return exchanges.DriverEvents.name;
  }

  static get entity() {
    throw new Error("Event entity is required");
  }

  build() {
    return { data: { ...this.data } };
  }

  get routingKey() {
    return `${this.organizationId}.${this.propertyId}.${this.constructor.entity}.${this.constructor.name}`;
  }
}

module.exports = Event;
