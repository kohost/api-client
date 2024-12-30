import Command from "./command";

class SetWindowCovering extends Command {
  constructor({ id, position, ...rest }) {
    super({ id, position, ...rest });
  }

  get name() {
    return "SetWindowCovering";
  }
}

export default SetWindowCovering;
