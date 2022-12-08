class Event {
  constructor(data, context) {
    this.data = {};
    this.context = {};
    if (!data) throw new Error("Event data is required");
    if (typeof data !== "object")
      throw new Error("Event data must be an object");

    if (!data.name) this.data.name = this.name;
    if (!data.type) this.data.type = this.type;

    for (const key in data) {
      this.data[key] = data[key];
    }

    if (data.eventData) {
      for (const key in data.eventData) {
        this.data[key] = data.eventData[key];
      }
      delete this.data.eventData;
    }

    if (context) {
      for (const key in context) {
        this.context[key] = context[key];
      }
    }

    if (!this.data.timestamp) this.data.timestamp = new Date();
  }
  get name() {
    throw new Error("Event name is required");
  }

  get type() {
    return "Event";
  }

  get routingKey() {
    return "";
  }

  get exchange() {
    return "Events";
  }

  build() {
    return { data: { ...this.data } };
  }
}

module.exports = Event;
