import { Command } from "./command";

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
