const Command = require("./Command");

class SetDimmerCommand extends Command {
  constructor({ id, level }) {
    super({ id, level });
  }

  get name() {
    return "SetDimmer";
  }

  get exchange() {
    return "Devices";
  }

  get routingKey() {
    return `dimmer.${this.data.id}.set`;
  }
}

module.exports = SetDimmerCommand;
