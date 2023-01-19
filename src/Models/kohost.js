const { ValidationError } = require("../Errors");
const { customAlphabet: generate } = require("nanoid");

class Kohost {
  constructor(data) {
    if (!this.schema) {
      throw new Error("Schema is not defined");
    }

    if (!this.validator) {
      throw new Error("Validator is not defined");
    }

    const isNew = data?.id ? false : true;

    this._setId(data);
    this._validate(data);
    this._setProperties(data);
    this._setTimestamps(isNew);
  }

  static get validProperties() {
    throw new Error("validProperties is not defined");
  }

  get schemaProperties() {
    return Object.keys(this.validator.schema.properties);
  }

  _setId(data) {
    if (data._id) data.id = data._id;
    if (!data.id) {
      data.id = this.constructor.generateId();
    }
    delete data._id;
  }

  _setProperties(data) {
    this.schemaProperties.forEach((key) => {
      if (data[key] !== undefined) this[key] = data[key];
    });
  }

  _setTimestamps(isNew) {
    const now = new Date();
    if (
      isNew &&
      this.schemaProperties.includes("createdAt") &&
      !this.createdAt
    ) {
      this.createdAt = now;
    }
  }

  _validate(data) {
    const valid = this.validator(data);
    if (!valid) {
      throw new ValidationError(`Invalid ${this.constructor.name}`, {
        cause: this.validator.errors,
      });
    }
  }

  static generateId() {
    const length = 8;
    const characters =
      "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const id = generate(characters, length)();
    return id;
  }

  static getActionDelta(old, _new) {
    const delta = {};
    for (const action in _new) {
      if (this.actionProperties?.includes(action)) {
        if (old[action] !== _new[action]) {
          delta[action] = 1;
        }
      }
    }
    return delta;
  }

  toObject() {
    const obj = { ...this };
    // delete keys if they are not valid properties
    Object.keys(obj).forEach((key) => {
      if (!this.constructor.validProperties.includes(key)) {
        delete obj[key];
      }
    });
    return obj;
  }
}

module.exports = Kohost;
