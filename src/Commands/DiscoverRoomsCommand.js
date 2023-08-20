const Command = require("./Command");

class DiscoverRoomsCommand extends Command {
  constructor({
    id,
    types,
    spaceTypes,
    startDate,
    endDate,
    serviceStatus,
    housekeepingStatus,
    ...rest
  }) {
    super({
      id,
      types,
      spaceTypes,
      startDate,
      endDate,
      serviceStatus,
      housekeepingStatus,
      ...rest,
    });
  }

  get name() {
    return "DiscoverRooms";
  }

  get routingKey() {
    if (typeof this.data.id === "string") return `rooms.${this.data.id}.get`;
    if (Array.isArray(this.data.id)) return "rooms.batch.get";
    return "rooms.get";
  }
}

module.exports = DiscoverRoomsCommand;
