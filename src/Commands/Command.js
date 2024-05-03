const exchanges = require("../defs/amqpExchanges");

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

  static get type() {
    return "Command";
  }

  static get exchange() {
    return exchanges.Commands.name;
  }

  build() {
    return { data: { ...this.data } };
  }
}

module.exports = Command;
