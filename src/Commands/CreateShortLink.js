import { RequestError } from "../Errors";
import { Command } from "./Command";

export class CreateShortLink extends Command {
  constructor({ title, destination, ...rest }) {
    if (!title) throw new RequestError("title is required");
    if (!destination) throw new RequestError("destination to is required");
    super({ title, destination, ...rest });
  }

  get name() {
    return "CreateShortLink";
  }
}
