const Ajv = require("ajv");
const ajv = new Ajv({
  allErrors: true,
  useDefaults: true,
  strict: true,
  allowMatchingProperties: true,
  allowUnionTypes: true,
});
const addFormats = require("ajv-formats");
const { customAlphabet: generate } = require("nanoid");
const commonDefs = require("../schemas/definitions/common.json");
const userDefs = require("../schemas/definitions/user.json");
const deviceDefs = require("../schemas/definitions/device.json");
const { ValidationError } = require("../errors");

addFormats(ajv);

function addSchema(schema) {
  ajv.addSchema(schema);
}

addSchema(commonDefs);
addSchema(userDefs);
addSchema(deviceDefs);

function createModel({
  preValidate,
  schema,
  name,
  methods = [],
  statics = [],
}) {
  ajv.addSchema(schema);
  const validator = ajv.compile(schema);
  const properties = Object.keys(validator.schema.properties);
  class KohostModel {
    constructor(data) {
      this._setId(data);
      if (preValidate) preValidate.call(this, data);
      this._validate(data);
      this._setProperties(data);
      this._setTimestamps();
    }

    set _id(id) {
      this.id = id;
    }

    set isNew(isNew = false) {
      this._isNew = isNew || false;
    }

    get isNew() {
      return this._isNew || false;
    }

    get schemaProperties() {
      return properties;
    }

    _setId(data) {
      if (data._id) data.id = data._id;
      if (!data.id) {
        data.id = this.constructor.generateId();
        this.isNew = true;
      }
      delete data._id;
    }

    _setProperties(data) {
      this.schemaProperties.forEach((key) => {
        if (data[key] !== undefined) this[key] = data[key];
      });
    }

    _setTimestamps() {
      const now = new Date();
      if (this.isNew && this.schemaProperties.includes("createdAt")) {
        this.createdAt = now;
      }
    }

    _validate(data) {
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

    toObject(opts = { mongo: false }) {
      const obj = { ...this };
      if (opts?.mongo) {
        obj._id = obj.id;
        delete obj.id;
      }
      delete obj._isNew;
      return obj;
    }
  }

  // change the name of the class
  Object.defineProperty(KohostModel, "name", { value: name });
  KohostModel.validProperties = properties;
  KohostModel.requiredProperties = schema.required;

  Object.defineProperty(KohostModel.prototype, "_validator", {
    get: function () {
      return validator;
    },
  });

  Object.defineProperty(KohostModel.prototype, "_isNew", {
    value: false,
    writable: true,
    enumerable: false,
  });

  Object.defineProperty(KohostModel.prototype, "schema", {
    get: function () {
      return validator.schema;
    },
  });

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
