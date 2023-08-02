const Command = require("./Command");
const RequestError = require("../Errors/RequestError");

class SendEmailCommand extends Command {
  constructor({ text, html, to, from, subject, ...rest }) {
    if (!to) throw new RequestError("email to is required");
    if (!from) throw new RequestError("email from is required");
    if (!subject) throw new RequestError("email subject is required");
    if (!text && !html)
      throw new RequestError("email text or html is required");

    super({ text, html, to, from, subject, ...rest });
  }

  get name() {
    return "SendEmail";
  }

  get routingKey() {
    return "comm.email.send";
  }
}

module.exports = SendEmailCommand;
