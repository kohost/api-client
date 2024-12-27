import Command from "./Command";

class SetDimmer extends Command {
  constructor({ id, level, ...rest }) {
    super({ id, level, ...rest });
  }

  get name() {
    return "SetDimmer";
  }
}

export default SetDimmer;
