const { RequestError } = require("../Errors");
const Command = require("./Command");

class DiscoverReservationRoomTypeUpsellOptionsCommand extends Command {
  constructor(options) {
    if (!options) throw new RequestError("options are required");
    const { id, ...rest } = options;
    super({ id, ...rest });
  }

  get name() {
    return "DiscoverReservationRoomTypeUpsellOptions";
  }

  get routingKey() {
    return "reservation.discoverRoomUpsells";
  }
}

module.exports = DiscoverReservationRoomTypeUpsellOptionsCommand;
