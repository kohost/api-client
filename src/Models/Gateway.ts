// Create the Gateway Model
import { add, compile } from "../utils/schema";
import schema, { properties } from "../schemas/gateway.json";
import Entity from "./Entity";

add(schema);
const validator = compile(schema);

type GatewayType = import("../types/GatewaySchema").IoTGateway;

class Gateway extends Entity {
  constructor(gateway: GatewayType) {
    super(gateway);
  }

  schema = schema;
  validator = validator;
  validProperties = Object.keys(properties);
}

export default Gateway;
