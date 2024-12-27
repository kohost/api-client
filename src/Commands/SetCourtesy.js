import Command from "./Command";

class SetCourtesy extends Command {
  constructor({ id, state, ...rest }) {
    super({ id, state, ...rest });
  }

  get name() {
    return "SetCourtesy";
  }
}

export default SetCourtesy;
