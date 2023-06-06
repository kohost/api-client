const Event = require("./Event");

class SMSEvent extends Event {
  constructor(sms, context) {
    super(sms, context);
    this.status = sms.status;
  }

  get name() {
    return "SMSEvent";
  }

  get routingKey() {
    return `comm.sms.${this.status}`;
  }
}

module.exports = SMSEvent;
