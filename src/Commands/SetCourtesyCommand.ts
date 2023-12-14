import Command from "./Command";

interface SetCourtesyCommandOptions {
  id: string;
  state: "privacy" | "service" | "none";
  [key: string]: any;
}

class SetCourtesyCommand extends Command {
  constructor(options: SetCourtesyCommandOptions) {
    super(options);
  }

  get name() {
    return "SetCourtesy";
  }

  get routingKey() {
    return `courtesy.${this.data.id}.set`;
  }
}

export default SetCourtesyCommand;
