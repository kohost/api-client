import { Command } from "./command";

export class SendSMS extends Command {
  constructor({ id, body, to, from, media, ...rest }) {
    super({ id, body, to, from, media, ...rest });
  }

  get name() {
    return "SendSMS";
  }
}
