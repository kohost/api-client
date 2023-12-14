import Command from "./Command";

interface SetSwitchCommandOptions {
  id: string;
  state: "on" | "off";
  [key: string]: any;
}

class SetSwitchCommand extends Command {
  constructor(options: SetSwitchCommandOptions) {
    super(options);
  }

  get name() {
    return "SetSwitch";
  }

  get routingKey() {
    return `switch.${this.data.id}.set`;
  }
}

export default SetSwitchCommand;
