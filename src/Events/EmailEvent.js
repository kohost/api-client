const Event = require("./Event");

class EmailEvent extends Event {
  constructor(email, context) {
    super(email, context);
  }

  static get name() {
    return "EmailEvent";
  }

  static get entity() {
    return "emailMessage";
  }
}

module.exports = EmailEvent;
