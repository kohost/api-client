const Command = require("./Command");

class SetDimmerCommand extends Command {
  constructor({ id, level }) {
    super({ id, level });
  }

  get name() {
    return "SetDimmer";
  }

  get routingKey() {
    return `dimmer.${this.data.id}.set`;
  }

  get replyTo() {
    return "system.response.devices";
  }
}

module.exports = SetDimmerCommand;
