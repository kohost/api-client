const Command = require("./Command");

class SetCourtesyCommand extends Command {
  constructor({ id, state, ...rest }) {
    super({ id, state, ...rest });
  }

  get name() {
    return "SetCourtesy";
  }

  get routingKey() {
    return `courtesy.${this.data.id}.set`;
  }
}

module.exports = SetCourtesyCommand;
