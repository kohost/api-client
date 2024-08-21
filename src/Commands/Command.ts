import exchanges, { ExchangeName } from "../utils/amqpExchanges";

export abstract class Command {
  abstract name: string;
  data: object;
  constructor(data: object) {
    if (!data) throw new Error("Command data is required");
    if (typeof data !== "object")
      throw new Error("Command data must be an object");
    this.data = data;
  }

  static get type() {
    return "Command";
  }

  static get exchange(): ExchangeName {
    return exchanges.Commands.name;
  }

  build() {
    return { data: this.data };
  }
}

export default Command;
