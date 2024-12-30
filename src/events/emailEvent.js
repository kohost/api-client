import Event from "./event";

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

export default EmailEvent;
