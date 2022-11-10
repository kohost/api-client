const Command = require("./Command");

class SetCourtesyCommand extends Command {
  constructor({ id, state }) {
    super({ id, state });
  }

  get name() {
    return "SetCourtesy";
  }

  get exchange() {
    return "Devices";
  }

  get routingKey() {
    return `courtesy.${this.data.id}.set`;
  }
}

module.exports = SetCourtesyCommand;
