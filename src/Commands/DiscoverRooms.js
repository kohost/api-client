const Command = require("./Command");

class DiscoverRooms extends Command {
  constructor({
    id,
    types,
    categories,
    startDate,
    endDate,
    serviceStatus,
    housekeepingStatus,
    ...rest
  }) {
    super({
      id,
      types,
      categories,
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
}

module.exports = DiscoverRooms;
