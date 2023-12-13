import Event from "./Event";

type SMSMessage = import("../types/SmsMessageSchema").SMSMessage;

class SMSEvent extends Event {
  constructor(sms: SMSMessage, context = {}) {
    super(sms, context);
  }

  get name() {
    return "SMSEvent";
  }

  get routingKey() {
    return `comm.sms.${this.data[0].status}`;
  }
}

export default SMSEvent;
