class Event {
  constructor(data, context) {
    this.data = [];
    this.context = {};
    if (!data) throw new Error("Event data is required");
    if (typeof data !== "object" && !Array.isArray(data))
      throw new Error("Event data must be an object or array");

    if (!Array.isArray(data)) this.data = [data];
    else this.data = data;

    this.data = this.data.map((d) => {
      if (d.eventData) {
        if (!d.eventData.timestamp) d.eventData.timestamp = new Date();
        if (!d.eventData.name) d.eventData.name = this.name;
        if (!d.eventData.type) d.eventData.type = this.type;
      }
      return d;
    });

    if (context) {
      for (const key in context) {
        this.context[key] = context[key];
      }
    }
  }

  get keyId() {
    if (Array.isArray(this.data)) return "batch";
    if (this.data.id) return this.data.id;
    return "unknown";
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
