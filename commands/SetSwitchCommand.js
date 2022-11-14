const Command = require("./Command");

class SetSwitchCommand extends Command {
  constructor({ id, state }) {
    super({ id, state });
  }

  get name() {
    return "SetSwitch";
  }

  get routingKey() {
    return `switch.${this.data.id}.set`;
  }

  get replyTo() {
    return "system.response.devices";
  }
}

module.exports = SetSwitchCommand;
