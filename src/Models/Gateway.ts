// Create the Gateway Model
import { registerSchema, compileSchema } from "../utils/schema";
import { schema, type IoTGatewaySchema } from "../schemas/iotGateway.json";
import Entity from "./Entity";

registerSchema(schema);

interface Gateway extends IoTGatewaySchema {}
class Gateway extends Entity {
  constructor(gateway: IoTGatewaySchema) {
    super(gateway);
  }
}

Gateway.validator = compileSchema(schema);
Gateway.schema = schema;
Gateway.validProperties = Object.keys(schema.properties);

export default Gateway;
