import Command from "./Command";

class SetLock extends Command {
  constructor({ id, state, ...rest }) {
    super({ id, state, ...rest });
  }

  get name() {
    return "SetLock";
  }
}

export default SetLock;
