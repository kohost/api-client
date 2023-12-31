import { type MediaFileSchema } from "../schemas/mediaFile.json";
import Command from "./Command";

interface BaseSendSMSCommandOptions {
  to: string;
  from: string;
  [key: string]: any;
}

interface BodySendSMSCommandOptions extends BaseSendSMSCommandOptions {
  body: string;
  media?: MediaFileSchema;
}

interface MediaSendSMSCommandOptions extends BaseSendSMSCommandOptions {
  body?: string;
  media: MediaFileSchema;
}

type SendSMSCommandOptions =
  | BodySendSMSCommandOptions
  | MediaSendSMSCommandOptions;

class SendSMSCommand extends Command {
  constructor(options: SendSMSCommandOptions) {
    super(options);
  }

  get name() {
    return "SendSMS";
  }

  get routingKey() {
    return "comm.sms.send";
  }
}

export default SendSMSCommand;
