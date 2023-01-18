const Event = require("./Event");

class SMSSentEvent extends Event {
  constructor(email, context) {
    super(email, context);
  }

  get name() {
    return "SMSSent";
  }

  get routingKey() {
    return "comm.sms.sent";
  }
}

module.exports = SMSSentEvent;
