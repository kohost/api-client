import { SmsMessageSchema } from "../Models/SmsMessage";
import { Event } from "./Event";

class SMSEvent extends Event {
  constructor(sms: SmsMessageSchema, context = {}) {
    super(sms, context);
  }

  static get name() {
    return "SMSEvent";
  }

  get entity() {
    return "smsMessage" as const;
  }
}

export default SMSEvent;
