import Command from "./command";

class GetProducts extends Command {
  constructor({ id, externalSystemId, ...rest }) {
    super({ id, externalSystemId, ...rest });
  }

  get name() {
    return "GetProducts";
  }
}

export default GetProducts;
