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
  type: string;
}

export abstract class Entity<ESchema extends { type: string }>
  implements ValidateableEntity
{
  data: ESchema;
  type: string;
  abstract validator: ValidateFunction;
  constructor(data: ESchema) {
    this.validate(data);
    this.data = data;
    this.type = data.type;
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
