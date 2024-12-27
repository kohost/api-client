import Command from "./Command";

class SetScene extends Command {
  constructor({ id, devices, ...rest }) {
    super({ id, devices, ...rest });
  }

  get name() {
    return "SetScene";
  }
}

export default SetScene;
