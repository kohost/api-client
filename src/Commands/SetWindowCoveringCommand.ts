import Command from "./Command";

interface SetWindowCoveringCommandOptions {
  id: string;
  position: number;
  [key: string]: any;
}

class SetWindowCoveringCommand extends Command {
  constructor(options: SetWindowCoveringCommandOptions) {
    super(options);
  }

  get name() {
    return "SetWindowCovering";
  }

  get routingKey() {
    return `windowCovering.${this.data.id}.set`;
  }
}

export default SetWindowCoveringCommand;
