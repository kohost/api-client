const Ajv = require("ajv");
const ajv = new Ajv({ allErrors: true, useDefaults: true, strict: false });
const { customAlphabet: generate } = require("nanoid");
const commonDefs = require("../schemas/definitions/common.json");
const userDefs = require("../schemas/definitions/user.json");
const deviceDefs = require("../schemas/definitions/device.json");
const { ValidationError } = require("../errors");

function addSchema(schema) {
  ajv.addSchema(schema);
}

addSchema(commonDefs);
addSchema(userDefs);
addSchema(deviceDefs);

function createModel({ schema, name, methods = [], statics = [] }) {
  ajv.addSchema(schema);
  const validator = ajv.compile(schema);
  const properties = Object.keys(validator.schema.properties);
  class KohostModel {
    constructor(data) {
      // apply schema properties to the class
      if (data._id) data.id = data._id;
      if (data.id && typeof data.id !== "string") data.id = data.id.toString();
      if (!data.id) data.id = this.constructor.generateId();
      delete data._id;
      this.validate(data);
      properties.forEach((key) => {
        if (data[key] !== undefined) this[key] = data[key];
      });
    }

    set _id(id) {
      this.id = id;
    }

    validate(data) {
      const valid = this._validator(data);
      if (!valid)
        throw new ValidationError(`Invalid ${name}`, {
          cause: this._validator.errors,
        });
    }

    static generateId() {
      const length = 8;
      const characters =
        "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
      const id = generate(characters, length)();
      return id;
    }

    toObject({ mongo = false }) {
      const obj = { ...this };
      if (mongo) {
        obj._id = obj.id;
        delete obj.id;
      }

      return obj;
    }
  }

  // change the name of the class
  Object.defineProperty(KohostModel, "name", { value: name });
  KohostModel.validProperties = properties;
  KohostModel.requiredProperties = schema.required;
  KohostModel.prototype._validator = validator;
  KohostModel.prototype.schema = validator.schema;

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
  validator: ajv,
};
