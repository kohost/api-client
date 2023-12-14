import Command from "./Command";

interface GetMobileKeyCommandOptions {
  id: string | string[];
  phone: string;
  beginDateTime: string | Date;
  endDateTime: string | Date;
  keyToReplace?: string;
  deviceId?: string;
  [key: string]: any;
}

class GetMobileKeyCommand extends Command {
  constructor(options: GetMobileKeyCommandOptions) {
    super(options);
  }

  get name() {
    return "GetMobileKey";
  }

  get routingKey() {
    return `lock.${this.data.id}.set`;
  }
}

export default GetMobileKeyCommand;
