import { amqpExchanges } from "../defs";

const Commands = amqpExchanges.Commands;

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
    return Commands.name;
  }

  build() {
    return { data: { ...this.data } };
  }
}

export default Command;
