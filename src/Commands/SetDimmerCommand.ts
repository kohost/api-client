import Command from "./Command";

interface SetDimmerCommandOptions {
  id: string;
  level: number;
  [key: string]: any;
}

class SetDimmerCommand extends Command {
  constructor(options: SetDimmerCommandOptions) {
    super(options);
  }

  get name() {
    return "SetDimmer";
  }

  get routingKey() {
    return `dimmer.${this.data.id}.set`;
  }
}

export default SetDimmerCommand;
