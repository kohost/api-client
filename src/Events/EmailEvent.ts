import Event from "./Event";

type EmailMessage = import("../types/EmailMessageSchema").EmailMessage;

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
