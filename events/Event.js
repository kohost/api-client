class Event {
  constructor(data) {
    this.data = {};
    if (!data) throw new Error("Event data is required");
    if (typeof data !== "object")
      throw new Error("Event data must be an object");

    for (const key in data) {
      this.data[key] = data[key];
    }
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
