const Command = require("./Command");

class DiscoverRoomsCommand extends Command {
<<<<<<< Updated upstream
  constructor({ id }) {
    super({ id });
=======
  constructor({
    id,
    types,
    startDate,
    endDate,
    serviceStatus,
    housekeepingStatus,
  }) {
    super({ id, types, startDate, endDate, serviceStatus, housekeepingStatus });
>>>>>>> Stashed changes
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
