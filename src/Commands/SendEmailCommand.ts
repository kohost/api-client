import Command from "./Command";

interface BaseSendEmailCommandOptions {
  to: string;
  from: string;
  subject: string;
  [key: string]: any;
}

interface TextSendEmailCommandOptions extends BaseSendEmailCommandOptions {
  text: string;
  html?: string;
}

interface HtmlSendEmailCommandOptions extends BaseSendEmailCommandOptions {
  text?: string;
  html: string;
}

type SendEmailCommandOptions =
  | TextSendEmailCommandOptions
  | HtmlSendEmailCommandOptions;

class SendEmailCommand extends Command {
  constructor(options: SendEmailCommandOptions) {
    super(options);
  }

  get name() {
    return "SendEmail";
  }

  get routingKey() {
    return "comm.email.send";
  }
}

export default SendEmailCommand;
