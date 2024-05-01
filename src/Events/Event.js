const AMQPClient = require("../AMQPClient");

class Event {
  constructor(data, context) {
    this.data = [];
    this.context = {};
    if (!data) throw new Error("Event data is required");
    if (typeof data !== "object" && !Array.isArray(data))
      throw new Error("Event data must be an object or array");

    if (!Array.isArray(data)) this.data = [data];
    else this.data = data;

    if (context) {
      for (const key in context) {
        this.context[key] = context[key];
      }
    }
    this.organizationId = this.context.organizationId || "*";
    this.propertyId = this.context.propertyId || "*";
  }

  static get name() {
    throw new Error("Event name is required");
  }

  static get type() {
    return "Event";
  }

  static get exchange() {
    return AMQPClient.exchanges.DriverEvents.name;
  }

  static get entity() {
    throw new Error("Event entity is required");
  }

  build() {
    return { data: { ...this.data } };
  }

  get routingKey() {
    return `${this.organizationId}.${this.propertyId}.${this.entity}.${this.name}`;
  }
}

module.exports = Event;
