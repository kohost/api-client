import { Command } from "./command.mjs";

export class SendEmail extends Command {
  constructor({ text, html, to, from, subject, ...rest }) {
    super({ text, html, to, from, subject, ...rest });
  }

  get name() {
    return "SendEmail";
  }
}
