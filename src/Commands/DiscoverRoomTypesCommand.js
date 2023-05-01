const Command = require("./Command");

class DiscoverRoomTypesCommand extends Command {
  constructor({ id }) {
    super({ id });
  }

  get name() {
    return "DiscoverRoomTypes";
  }

  get routingKey() {
    if (typeof this.data.id === "string") return `rooms.${this.data.id}.get`;
    if (Array.isArray(this.data.id)) return "rooms.batch.get";
    return "rooms.get";
  }
}

module.exports = DiscoverRoomTypesCommand;
