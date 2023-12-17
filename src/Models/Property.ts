import { add, compile } from "../utils/schema";
import schema, { properties } from "../schemas/property.json";
import Entity from "./Entity";

add(schema);
const validator = compile(schema);

type PropertySchema = import("../types/PropertySchema").PropertySchema;

class Property extends Entity {
  constructor(property: PropertySchema) {
    super(property);
  }

  schema = schema;
  validator = validator;
  validProperties = Object.keys(properties);
}

export default Property;
