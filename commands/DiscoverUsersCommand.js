const Command = require("./Command");

class SetAlarmCommand extends Command {
  constructor({ id }) {
    super({ id });
  }

  get name() {
    return "DiscoverUsers";
  }

  get routingKey() {
    return `users.${this.data.id}.get`;
  }

  get replyTo() {
    return "system.response.users";
  }
}

module.exports = SetAlarmCommand;
