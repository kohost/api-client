import EmailMessage from "../Models/EmailMessage";
import Event from "./Event";

class EmailEvent extends Event {
  constructor(email: EmailMessage, context = {}) {
    super(email, context);
  }

  get name() {
    return "EmailEvent";
  }

  get routingKey() {
    return `comm.email.${this.data[0].status}`;
  }
}

export default EmailEvent;
