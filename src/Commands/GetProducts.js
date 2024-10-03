import { Command } from "./Command";

export class GetProducts extends Command {
  constructor({ id, externalSystemId, ...rest }) {
    super({ id, externalSystemId, ...rest });
  }

  get name() {
    return "GetProducts";
  }
}
