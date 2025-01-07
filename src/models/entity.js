import { ValidationError } from "../errors/validationError";

export class Entity {
  constructor(data) {
    if (!this.schema) {
      throw new Error("Schema is not defined");
    }

    if (!this.validator) {
      throw new Error("Validator is not defined");
    }

    this.#validate(data);
  }

  get schemaProperties() {
    return Object.keys(this.validator.schema.properties);
  }

  #validate(data) {
    const valid = this.validator(data);
    if (!valid) {
      throw new ValidationError(`Invalid ${this.constructor.name}`, {
        cause: this.validator.errors,
      });
    }
  }
}
