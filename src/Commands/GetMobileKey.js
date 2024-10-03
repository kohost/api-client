import { Command } from "./Command";

export class GetMobileKey extends Command {
  constructor({
    id,
    phone,
    beginDateTime,
    endDateTime,
    keyToReplace,
    ...rest
  }) {
    super({ id, phone, beginDateTime, endDateTime, keyToReplace, ...rest });
  }

  get name() {
    return "GetMobileKey";
  }
}
