const Command = require("./Command");
const RequestError = require("../Errors/RequestError");

class SendSMSCommand extends Command {
  constructor({ body, to, from, metaData }) {
    if (!body) throw new RequestError("sms body is required");
    if (!to) throw new RequestError("sms to is required");
    if (!from) throw new RequestError("sms from is required");
    super({ body, to, from, metaData });
  }

  get name() {
    return "SendSMS";
  }

  get routingKey() {
    return "comm.sms.send";
  }
}

module.exports = SendSMSCommand;
