const Command = require("./Command");

class SetLockCommand extends Command {
  constructor({ id, state }) {
    super({ id, state });
  }

  get name() {
    return "SetLock";
  }

  get routingKey() {
    return `lock.${this.data.id}.set`;
  }

  get replyTo() {
    return "system.response.devices";
  }
}

module.exports = SetLockCommand;
