const Event = require("./Event");

class EmailSentEvent extends Event {
  constructor(email, context) {
    super(email, context);
  }

  get name() {
    return "EmailSent";
  }

  get routingKey() {
    return "comm.email.sent";
  }
}

module.exports = EmailSentEvent;
