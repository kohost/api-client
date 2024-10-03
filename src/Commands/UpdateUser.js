import { RequestError } from "../Errors";
import { Command } from "./Command";

export class UpdateUser extends Command {
  constructor({
    id,
    email,
    phone,
    identification,
    address,
    note,
    nationality,
    file,
    payment,
    ...rest
  }) {
    if (!id) throw new RequestError("document type is required");
    super({
      id,
      email,
      phone,
      identification,
      address,
      note,
      nationality,
      file,
      payment,
      ...rest,
    });
  }

  get name() {
    return "UpdateUser";
  }
}
