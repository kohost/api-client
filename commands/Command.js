class Command {
  constructor(data) {
    this.data = {};
    if (!data) throw new Error("Command data is required");
    if (typeof data !== "object")
      throw new Error("Command data must be an object");

    for (const key in data) {
      this.data[key] = data[key];
    }
  }

  get name() {
    throw new Error("Command name is required");
  }

  get type() {
    return "Command";
  }

  get routingKey() {
    return "";
  }

  get exchange() {
    return "Commands";
  }

  get replyTo() {
    return "amq.rabbitmq.reply-to";
  }

  build() {
    return { data: { ...this.data } };
  }
}

module.exports = Command;
