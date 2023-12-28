// Create the Gateway Model
import { add, compile } from "../utils/schema";
import schema, { properties } from "../schemas/gateway.json";
import Entity from "./Entity";
import { IoTGatewaySchema } from "../types/IoTGatewaySchema";

add(schema);
const validator = compile(schema);

class Gateway extends Entity {
  constructor(gateway: IoTGatewaySchema) {
    super(gateway);
  }

  schema = schema;
  validator = validator;
  validProperties = Object.keys(properties);
}

export default Gateway;
