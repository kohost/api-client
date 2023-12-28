import Command from "./Command";

type MediaFile = import("../types/MediaFileSchema").MediaFileSchema;

interface BaseSendSMSCommandOptions {
  to: string;
  from: string;
  [key: string]: any;
}

interface BodySendSMSCommandOptions extends BaseSendSMSCommandOptions {
  body: string;
  media?: MediaFile;
}

interface MediaSendSMSCommandOptions extends BaseSendSMSCommandOptions {
  body?: string;
  media: MediaFile;
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
