const Command = require("./Command");
const RequestError = require("../Errors/RequestError");

class UpdateReservation extends Command {
  constructor({ id, ...rest }) {
    if (!id) throw new RequestError("document type is required");
    super({ id, ...rest });
  }

  get name() {
    return "UpdateReservation";
  }
}

module.exports = UpdateReservation;
