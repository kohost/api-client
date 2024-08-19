import { RequestError } from "../Errors";
import { Command } from "./Command";

export interface CreateShortLinkOptions {
  title: string;
  destination: string;
}

export class CreateShortLink extends Command {
  constructor(opts: CreateShortLinkOptions & { [key: string]: any }) {
    if (!opts.title) throw new RequestError("title is required");
    if (!opts.destination) throw new RequestError("destination to is required");
    super(opts);
  }

  get name() {
    return "CreateShortLink";
  }
}

export default CreateShortLink;
