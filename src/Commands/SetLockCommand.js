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
}

module.exports = SetLockCommand;
