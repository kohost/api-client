import { registerSchema, compileSchema } from "../utils/schema";
import { schema, type PropertySchema } from "../schemas/property.json";
import Entity from "./Entity";

registerSchema(schema);

interface Property extends PropertySchema {}

class Property extends Entity {
  constructor(property: PropertySchema) {
    super(property);
  }
}

Property.validator = compileSchema(schema);
Property.schema = schema;
Property.validProperties = Object.keys(schema.properties);

export default Property;
