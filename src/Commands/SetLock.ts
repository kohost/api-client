const Command = require("./Command");

class SetLock extends Command {
  constructor({ id, state, ...rest }) {
    super({ id, state, ...rest });
  }

  get name() {
    return "SetLock";
  }
}

module.exports = SetLock;
