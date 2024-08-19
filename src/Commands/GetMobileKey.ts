import { Command } from "./Command";

export interface GetMobileKeyOptions {
  id?: string;
  phone?: string;
  beginDateTime?: string | Date;
  endDateTime?: string | Date;
  keyToReplace?: string;
}

export class GetMobileKey extends Command {
  constructor(opts: GetMobileKeyOptions & { [key: string]: any }) {
    super(opts);
  }

  get name() {
    return "GetMobileKey";
  }
}

export default GetMobileKey;
