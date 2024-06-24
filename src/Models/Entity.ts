import type { Schema, ValidateFunction } from "ajv";

export interface ValidateableEntity {
  validate(data: any): boolean | void;
  validator: ValidateFunction;
}

export abstract class Entity<ESchema> implements ValidateableEntity {
  data: ESchema;
  abstract validator: ValidateFunction<unknown>;
  constructor(data: ESchema) {
    this.validate(data);
    // map each key in data to the instance, accoriding to the Schema
    // with autocomplete and type checking
    this.data = data;
  }
  abstract validate(data: ESchema): boolean | void;

  static get validProperties(): string[] {
    return this.validator?.schema.properties;
  }
  static schema: Schema;
}
