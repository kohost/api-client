const Event = require("./Event");

class SMSEvent extends Event {
  constructor(sms, context) {
    super(sms, context);
  }

  static get name() {
    return "SMSEvent";
  }

  static get entity() {
    return "smsMessage";
  }
}

module.exports = SMSEvent;
