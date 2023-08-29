const Command = require("./Command");

class DiscoverUsersCommand extends Command {
  constructor({ id, ...rest }) {
    super({ id, ...rest });
  }

  get name() {
    return "DiscoverUsers";
  }

  get routingKey() {
    if (typeof this.data.id === "string") return `users.${this.data.id}.get`;
    if (Array.isArray(this.data.id)) return "users.batch.get";
    return "users.get";
  }
}

module.exports = DiscoverUsersCommand;
