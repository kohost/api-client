import { RequestError } from "../Errors";
import { Command } from "./Command";

export interface SendEmailOptions {
  text?: string;
  html?: string;
  to: string;
  from: string;
  subject: string;
}

export class SendEmail extends Command {
  constructor(options: SendEmailOptions & { [key: string]: any }) {
    const { text, html, to, from, subject, ...rest } = options;
    if (!to) throw new RequestError("email to is required");
    if (!from) throw new RequestError("email from is required");
    if (!subject) throw new RequestError("email subject is required");
    if (!text && !html)
      throw new RequestError("email text or html is required");

    super({ text, html, to, from, subject, ...rest });
  }

  get name() {
    return "SendEmail";
  }
}

export default SendEmail;
