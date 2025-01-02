import { Command } from "./command";

export class GetProducts extends Command {
  constructor({ id, externalSystemId, ...rest }) {
    super({ id, externalSystemId, ...rest });
  }

  get name() {
    return "GetProducts";
  }
}
