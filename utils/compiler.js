const Ajv = require("ajv");
const ajv = new Ajv({ allErrors: true });
const { customAlphabet: generate } = require("nanoid");

function addSchema(schema) {
  ajv.addSchema(schema);
}

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
        throw new Error(`Invalid ${name}`, { cause: this._validator.errors });
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

function convertJsonSchemaToMonogooseSchema(jsonSchema) {
  const mongooseSchema = {};
  const id = jsonSchema["$id"];
  const fullSchema = { ...jsonSchema.properties };

  const schemaKeys = Object.keys(fullSchema);

  schemaKeys.forEach((key) => {
    const val = fullSchema[key];
    let refValue = val["$ref"];
    if (refValue && refValue.startsWith("#/")) refValue = id + refValue;
    if (refValue && Object.keys(val).length === 1) {
      const ref = ajv.getSchema(refValue);
      if (ref) fullSchema[key] = ref.schema;
    }
  });

  schemaKeys.forEach((key) => {
    const keyName = key === "id" ? "_id" : key;
    const value = fullSchema[key];

    let schemaProp = {};

    if (value["type"]) {
      let type = value.type;
      if (Array.isArray(type)) {
        if (type.length === 2) {
          const nullIndex = type.indexOf("null");
          type = type[nullIndex === 0 ? 1 : 0];
        }
      }

      if (typeof type === "string") {
        switch (type) {
          case "string":
            schemaProp["type"] = String;
            break;
          case "number":
            schemaProp["type"] = Number;
            break;
          case "boolean":
            schemaProp["type"] = Boolean;
            break;
          case "object":
            schemaProp["type"] = Object;
            break;
          case "array":
            schemaProp["type"] = Array;
            break;
          default:
            throw new Error(`Invalid type ${type}`);
        }
      }
    }

    if (value["minimum"] !== undefined) {
      schemaProp["min"] = value["minimum"];
    }

    if (value["maximum"] !== undefined) {
      schemaProp["max"] = value["maximum"];
    }

    if (value["default"]) {
      schemaProp["default"] = value["default"];
    }

    if (value["properties"]) {
      const subSchema = convertJsonSchemaToMonogooseSchema({
        $id: id,
        properties: value["properties"],
      });
      schemaProp = { ...schemaProp, ...subSchema };
    }

    mongooseSchema[keyName] = schemaProp;
  });

  return mongooseSchema;
}

module.exports = {
  createModel,
  addSchema,
  validator: ajv,
  toMongoose: convertJsonSchemaToMonogooseSchema,
};
