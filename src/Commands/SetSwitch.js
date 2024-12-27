import Command from "./Command";

class SetSwitch extends Command {
  constructor({ id, state, ...rest }) {
    super({ id, state, ...rest });
  }

  get name() {
    return "SetSwitch";
  }
}

export default SetSwitch;
