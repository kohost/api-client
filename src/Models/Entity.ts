import type { Schema, ValidateFunction } from "ajv";

class ValidationError extends Error {
  cause: any;
  constructor(message: string, options: { cause: any }) {
    super(message);
    this.name = "ValidationError";
    this.cause = options.cause;
  }
}

export interface ValidateableEntity {
  validate(data: any): boolean | void;
  validator: ValidateFunction;
}

export abstract class Entity<ESchema extends {}> implements ValidateableEntity {
  data: ESchema;
  abstract validator: ValidateFunction;
  constructor(data: ESchema) {
    this.validate(data);
    this.data = data;
  }
  validate(data: ESchema): boolean | void {
    const valid = this.validator(data);
    if (!valid) {
      throw new ValidationError(`Invalid ${this.constructor.name}`, {
        cause: this.validator.errors,
      });
    }
  }

  static schema: Schema;
}
