const Command = require("./Command");

class GetMobileKeyCommand extends Command {
  constructor({
    id,
    phone,
    beginDateTime,
    endDateTime,
    keyToReplace,
    ...rest
  }) {
    super({ id, phone, beginDateTime, endDateTime, keyToReplace, ...rest });
  }

  get name() {
    return "GetMobileKey";
  }

  get routingKey() {
    return `lock.${this.data.id}.set`;
  }
}

module.exports = GetMobileKeyCommand;
