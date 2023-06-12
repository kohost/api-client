const Command = require("./Command");
const RequestError = require("../Errors/RequestError");

class SendSMSCommand extends Command {
  constructor({ id, body, to, from, ...rest }) {
    if (!body) throw new RequestError("sms body is required");
    if (!to) throw new RequestError("sms to is required");
    if (!from) throw new RequestError("sms from is required");
    super({ id, body, to, from, ...rest });
  }

  get name() {
    return "SendSMS";
  }

  get routingKey() {
    return "comm.sms.send";
  }
}

module.exports = SendSMSCommand;
