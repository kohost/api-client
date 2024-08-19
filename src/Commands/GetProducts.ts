import { Command } from "./Command";

export interface GetProductsOptions {
  id?: string;
  externalSystemId?: string;
}

export class GetProducts extends Command {
  constructor(opts: GetProductsOptions & { [key: string]: any }) {
    super(opts);
  }

  get name() {
    return "GetProducts";
  }
}
