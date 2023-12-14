interface CommandOptions {
  [key: string]: any;
}

class Command {
  data: CommandOptions;
  constructor(data: CommandOptions) {
    this.data = {};
    if (!data) throw new Error("Command data is required");
    if (typeof data !== "object")
      throw new Error("Command data must be an object");

    for (const key in data) {
      this.data[key] = data[key];
    }
  }

  get name(): string {
    return "";
  }

  get type(): string {
    return "Command";
  }

  get routingKey(): string {
    return "";
  }

  get exchange(): string {
    return "Commands";
  }

  build() {
    return { data: { ...this.data } };
  }
}

export default Command;
