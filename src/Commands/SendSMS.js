const Command = require("./Command");
const RequestError = require("../Errors/RequestError");

class SendSMS extends Command {
  constructor({ id, body, to, from, media, ...rest }) {
    if (!body && !media)
      throw new RequestError("sms body or media is required");
    if (!to) throw new RequestError("sms to is required");
    if (!from) throw new RequestError("sms from is required");
    super({ id, body, to, from, media, ...rest });
  }

  get name() {
    return "SendSMS";
  }
}

module.exports = SendSMS;
