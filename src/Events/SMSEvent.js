import { Event } from "./Event";

export class SMSEvent extends Event {
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
