const Command = require("./Command");

class GetMobileKeyCommand extends Command {
  constructor({ id, startDate, endDate }) {
    super({ id, startDate, endDate });
  }

  get name() {
    return "GetMobileKey";
  }

  get routingKey() {
    return `lock.${this.data.id}.set`;
  }

  get replyTo() {
    return "system.response.devices";
  }
}

module.exports = GetMobileKeyCommand;
