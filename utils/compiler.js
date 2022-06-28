const Ajv = require("ajv");
const ajv = new Ajv({ allErrors: true });

function addSchema(schema) {
  ajv.addSchema(schema);
}

function createModel({ schema, name, methods = [], statics = [] }) {
  const validator = ajv.compile(schema);
  const properties = Object.keys(validator.schema.properties);
  class KohostModel {
    constructor(data) {
      // apply schema properties to the class
      this.validate(data);
      properties.forEach((key) => {
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
  Object.defineProperty(KohostModel, "name", { value: name });
  KohostModel.prototype._validator = validator;
  KohostModel.prototype.schema = schema;
  KohostModel.validProperties = properties;

  methods.forEach((method) => {
    const methodName = method.name;
    KohostModel.prototype[methodName] = method;
  });
  statics.forEach((method) => {
    const methodName = method.name;
    KohostModel[methodName] = method;
  });
  return KohostModel;
}

module.exports = {
  createModel,
  addSchema,
};
