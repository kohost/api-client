const Event = require("./Event");

class EmailEvent extends Event {
  constructor(email, context) {
    super(email, context);
    this.status = email.status;
  }

  get name() {
    return "EmailEvent";
  }

  get routingKey() {
    return `comm.email.${this.status}`;
  }
}

module.exports = EmailEvent;
