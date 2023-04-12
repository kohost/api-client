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
    });
  }

  get name() {
    return "UpdateUser";
  }

  get routingKey() {
    return `user.${this.data.id}.update`;
  }

  get replyTo() {
    return "system.response.users";
  }
}

module.exports = UpdateUserCommand;
