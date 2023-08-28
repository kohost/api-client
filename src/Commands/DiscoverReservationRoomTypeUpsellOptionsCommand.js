const { RequestError } = require("../Errors");
const Command = require("./Command");

class DiscoverReservationSpaceCategoryAvailabilitiesCommand extends Command {
  constructor(options) {
    if (!options) throw new RequestError("options are required");
    const { id, ...rest } = options;
    super({ id, ...rest });
  }

  get name() {
    return "DiscoverReservationSpaceCategoryAvailabilities";
  }

  get routingKey() {
    return "reservation.discoverRoomUpsells";
  }
}

module.exports = DiscoverReservationSpaceCategoryAvailabilitiesCommand;
