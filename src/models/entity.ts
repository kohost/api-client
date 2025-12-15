import type { AnySchema, ValidateFunction } from "ajv";
import { ValidationError } from "../errors/validationError";

export class Entity {
  declare schema: AnySchema;
  declare validator: ValidateFunction;

  constructor(data: unknown) {
    if (!this.schema) {
      throw new Error("Schema is not defined");
    }

    if (!this.validator) {
      throw new Error("Validator is not defined");
    }

    this.#validate(data);
  }

  get schemaProperties(): string[] {
    const schema = this.validator.schema;
    if (typeof schema === "object" && schema !== null && "properties" in schema) {
      return Object.keys(schema.properties as Record<string, unknown>);
    }
    return [];
  }

  #validate(data: unknown) {
    const valid = this.validator(data);
    if (!valid) {
      throw new ValidationError(`Invalid ${this.constructor.name}`, {
        cause: this.validator.errors,
      });
    }
  }
}
