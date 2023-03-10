const Command = require("./Command");

class DiscoverRoomsCommand extends Command {
  constructor({ id }) {
    super({ id });
  }

  get name() {
    return "DiscoverRooms";
  }

  get routingKey() {
    if (typeof this.data.id === "string") return `rooms.${this.data.id}.get`;
    if (Array.isArray(this.data.id)) return "rooms.batch.get";
    return "rooms.get";
  }

  get replyTo() {
    return "system.response.users";
  }
}

module.exports = DiscoverRoomsCommand;
