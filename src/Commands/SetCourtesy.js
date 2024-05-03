const Command = require("./Command");

class SetCourtesy extends Command {
  constructor({ id, state, ...rest }) {
    super({ id, state, ...rest });
  }

  get name() {
    return "SetCourtesy";
  }
}

module.exports = SetCourtesy;
