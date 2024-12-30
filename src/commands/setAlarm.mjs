import { Command } from "./command.mjs";

export class SetAlarm extends Command {
  constructor({ id, zones, areas, code, ...rest }) {
    super({ id, zones, areas, code, ...rest });
  }

  get name() {
    return "SetAlarm";
  }
}
