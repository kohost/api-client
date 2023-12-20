import Command from "./Command";

type MediaSource = import("../types/MediaSourceSchema").MediaSourceSchema;

interface SetMediaCommandOptions {
  id: string;
  // any of the MediaSource command types
  command: keyof MediaSource["command"];
  data?: any;
  [key: string]: any;
}

class SetMediaCommand extends Command {
  constructor(options: SetMediaCommandOptions) {
    super(options);
  }

  get name() {
    return "SetMedia";
  }

  get routingKey() {
    return `mediaSource.${this.data.id}.set`;
  }
}

export default SetMediaCommand;
