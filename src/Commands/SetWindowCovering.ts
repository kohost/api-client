const Command = require("./Command");

class SetWindowCovering extends Command {
  constructor({ id, position, ...rest }) {
    super({ id, position, ...rest });
  }

  get name() {
    return "SetWindowCovering";
  }
}

module.exports = SetWindowCovering;
