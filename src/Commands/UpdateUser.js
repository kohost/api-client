const Command = require("./Command");
const RequestError = require("../Errors/RequestError");

class UpdateUser extends Command {
  constructor({
    id,
    email,
    phone,
    identification,
    address,
    note,
    nationality,
    file,
    payment,
    ...rest
  }) {
    if (!id) throw new RequestError("document type is required");
    super({
      id,
      email,
      phone,
      identification,
      address,
      note,
      nationality,
      file,
      payment,
      ...rest,
    });
  }

  get name() {
    return "UpdateUser";
  }
}

module.exports = UpdateUser;
