const Command = require("./Command");

class SetSwitch extends Command {
  constructor({ id, state, ...rest }) {
    super({ id, state, ...rest });
  }

  get name() {
    return "SetSwitch";
  }
}

module.exports = SetSwitch;
