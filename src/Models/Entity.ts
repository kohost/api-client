import type { AnySchema, ValidateFunction } from "ajv";
import { ValidationError } from "../Errors";
import { definitionsSchema } from "../schemas/definitions";
import { registerSchema } from "../utils/validation";

registerSchema(definitionsSchema);

const EntityBase = class {
  constructor(properties: object) {
    Object.assign(this, properties);
  }
} as new <t extends object>(base: t) => t;

/** @ts-expect-error (needed to extend `t`, but safe given ShallowClone's implementation) **/
export abstract class Entity<t extends object> extends EntityBase<t> {
  /**
   * Validator function for the entity
   */
  abstract validator: ValidateFunction;
  /**
   * Properties that are considered actions
   */
  static actionProperties?: string[];
  /**
   * JSON schema for the entity
   */
  static schema: AnySchema;
  constructor(data: t) {
    super(data);
    this.validate(data);
  }

  validate(data: t): void {
    if (!data)
      throw new ValidationError("Invalid data", { cause: "Data is empty" });
    if (!this.validator(data)) {
      throw new ValidationError(`Invalid ${this.constructor.name}`, {
        cause: this.validator.errors,
      });
    }
  }

  static getActionDelta(
    old: { [key: string]: any },
    _new: { [key: string]: any }
  ): { [key: string]: number } {
    const delta = {} as { [key: string]: number };
    for (const action in _new) {
      if (this.actionProperties?.includes(action)) {
        if (old[action] !== _new[action]) {
          delta[action] = 1;
        } else {
          delta[action] = 0;
        }
      }
    }
    return delta;
  }
}

export default Entity;
