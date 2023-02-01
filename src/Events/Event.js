class Event {
  constructor(data, context) {
    this.data = {};
    this.context = {};
    if (!data) throw new Error("Event data is required");
    if (typeof data !== "object")
      throw new Error("Event data must be an object");

    for (const key in data) {
      this.data[key] = data[key];
    }

    if (context) {
      for (const key in context) {
        this.context[key] = context[key];
      }
    }

    if (this.data.eventData && !this.data.eventData.timestamp)
      this.data.eventData.timestamp = new Date();
    if (this.data.eventData && !this.data.eventData.name)
      this.data.eventData.name = this.name;
    if (this.data.eventData && !this.data.eventData.type)
      this.data.eventData.type = this.type;
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
