const Ajv = require("ajv");
const ajv = new Ajv({ allErrors: true });

// load definitions
const deviceSchema = require("../schemas/definitions/device.json");

ajv.addSchema(deviceSchema);

function createModel({ schema, name, methods = [] }) {
  const validator = ajv.compile(schema);
  class Model {
    constructor(data) {
      // apply schema properties to the class
      this.validate(data);
      Object.keys(validator.schema.properties).forEach((key) => {
        if (data[key] !== undefined) this[key] = data[key];
      });
    }

    validate(data) {
      const valid = this._validator(data);
      if (!valid)
        throw new Error(`Invalid ${name}`, { cause: this._validator.errors });
    }
  }

  // change the name of the class
  Object.defineProperty(Model, "name", { value: name });
  Model.prototype._validator = validator;
  Model.prototype.schema = schema;
  methods.forEach((method) => {
    const methodName = method.name;
    Model.prototype[methodName] = method;
  });
  return Model;
}

module.exports = {
  createModel,
};
