import Command from "./Command";

class SendSMS extends Command {
  constructor({ id, body, to, from, media, ...rest }) {
    super({ id, body, to, from, media, ...rest });
  }

  get name() {
    return "SendSMS";
  }
}

export default SendSMS;
