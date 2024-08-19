const { RequestError } = require("../Errors");
const Command = require("./Command");

class GetReservationSpaceCategoryAvailabilities extends Command {
  constructor(options) {
    if (!options) throw new RequestError("options are required");
    const { id, ...rest } = options;
    super({ id, ...rest });
  }

  get name() {
    return "GetReservationSpaceCategoryAvailabilities";
  }
}

module.exports = GetReservationSpaceCategoryAvailabilities;
