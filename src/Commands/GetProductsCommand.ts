import Command from "./Command";

interface GetProductsCommandOptions {
  id: string | string[];
  externalSystemId?: string | string[];
  [key: string]: any;
}

class GetProductsCommand extends Command {
  constructor(options: GetProductsCommandOptions) {
    super(options);
  }

  get name() {
    return "GetProducts";
  }

  get routingKey() {
    return `product.${this.data.id}.get`;
  }
}

export default GetProductsCommand;
