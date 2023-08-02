const Command = require("./Command");
const RequestError = require("../Errors/RequestError");

class UpdateUserCommand extends Command {
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

  get routingKey() {
    return `user.${this.data.id}.update`;
  }
}

module.exports = UpdateUserCommand;
