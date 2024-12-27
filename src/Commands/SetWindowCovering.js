import Command from "./Command";

class SetWindowCovering extends Command {
  constructor({ id, position, ...rest }) {
    super({ id, position, ...rest });
  }

  get name() {
    return "SetWindowCovering";
  }
}

export default SetWindowCovering;
