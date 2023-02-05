const Command = require("./Command");

class DiscoverUsersCommand extends Command {
  constructor({ id }) {
    super({ id });
  }

  get name() {
    return "DiscoverUsers";
  }

  get routingKey() {
    if (typeof this.data.id === "string") return `users.${this.data.id}.get`;
    if (Array.isArray(this.data.id)) return "users.batch.get";
    return "users.get";
  }

  get replyTo() {
    return "system.response.users";
  }
}

module.exports = DiscoverUsersCommand;
