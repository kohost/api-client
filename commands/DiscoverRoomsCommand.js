const Command = require("./Command");

class DiscoverRoomsCommand extends Command {
  constructor({ id }) {
    super({ id });
  }

  get name() {
    return "DiscoverRooms";
  }

  get routingKey() {
    return `rooms.${this.data.id}.get`;
  }

  get replyTo() {
    return "system.response.users";
  }
}

module.exports = DiscoverRoomsCommand;
