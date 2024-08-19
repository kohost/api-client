import { RequestError } from "../Errors";
import { Command } from "./Command";

export interface SendSMSOptions {
  id?: string;
  body?: string;
  to: string;
  from: string;
  media?: string;
}

export class SendSMS extends Command {
  constructor(options: SendSMSOptions & { [key: string]: any }) {
    const { id, body, to, from, media, ...rest } = options;
    if (!body && !media)
      throw new RequestError("sms body or media is required");
    if (!to) throw new RequestError("sms to is required");
    if (!from) throw new RequestError("sms from is required");
    super({ id, body, to, from, media, ...rest });
  }

  get name() {
    return "SendSMS";
  }
}

export default SendSMS;
