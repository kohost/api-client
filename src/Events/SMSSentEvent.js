const Event = require("./Event");

class SMSSentEvent extends Event {
  constructor(sms, context) {
    super(sms, context);
  }

  get name() {
    return "SMSSent";
  }

  get routingKey() {
    return "comm.sms.sent";
  }
}

module.exports = SMSSentEvent;
