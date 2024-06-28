import { type EmailMessageSchema } from "../Models/EmailMessage";
import { Event } from "./Event";

class EmailEvent extends Event {
  constructor(email: EmailMessageSchema, context = {}) {
    super(email, context);
  }

  static get name() {
    return "EmailEvent";
  }

  get entity() {
    return "emailMessage" as const;
  }
}

export default EmailEvent;
