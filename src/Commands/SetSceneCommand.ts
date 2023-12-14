import Command from "./Command";

interface SetSceneCommandOptions {
  id: string;
  devices?: any[];
  [key: string]: any;
}

class SetSceneCommand extends Command {
  constructor(options: SetSceneCommandOptions) {
    super(options);
  }

  get name() {
    return "SetScene";
  }

  get routingKey() {
    return `scene.${this.data.id}.set`;
  }
}

export default SetSceneCommand;
