import { Command } from "./Command";

type DateLike = Date | number | `${string}T${string}Z` | string;

export interface CreateImageUploadEndpointOptions {
  id: string;
  expires: DateLike;
}

export class CreateImageUploadEndpoint extends Command {
  constructor(opts: CreateImageUploadEndpointOptions & { [key: string]: any }) {
    if (!opts.id) throw new Error("Id is required");
    if (!opts.expires) throw new Error("Expires is required");
    if (!isValidDate(opts.expires))
      throw new Error("Expires must be a valid date");

    super(opts);
  }

  get name() {
    return "CreateImageUploadEndpoint";
  }
}

function isValidDate(date: DateLike): date is Date {
  return new Date(date).toString() !== "Invalid Date";
}
