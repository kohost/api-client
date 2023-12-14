import Command from "./Command";
import RequestError from "../Errors/RequestError";

type CreateShortLinkCommandProps = {
  title: string;
  destination: string;
  [key: string]: any;
};

class CreateShortLinkCommand extends Command {
  constructor(options: CreateShortLinkCommandProps) {
    if (!options.title) throw new RequestError("title is required");
    if (!options.destination)
      throw new RequestError("destination to is required");
    super(options);
  }

  get name() {
    return "CreateShortLink";
  }

  get routingKey() {
    return "comm.shortlink.create";
  }
}

export default CreateShortLinkCommand;
