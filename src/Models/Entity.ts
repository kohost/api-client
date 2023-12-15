import ValidationError from "../Errors/ValidationError";
import { customAlphabet as generate } from "nanoid";

type ValidateFunction = import("ajv").ValidateFunction;
type AnySchema = import("ajv").AnySchema;

interface EntityData {
  [key: string]: any;
}

abstract class Entity {
  abstract schema: AnySchema;
  abstract validator: ValidateFunction;
  abstract validProperties: string[];
  [key: string]: any;

  constructor(data: EntityData) {
    const isNew = data?.id ? false : true;

    this.#_setId(data);
    this.#_validate(data);
    this.#_setProperties(data);
    this.#_setTimestamps(isNew);
  }

  #_setId(data: EntityData) {
    if (data._id) data.id = data._id;
    if (!data.id) {
      data.id = Entity.generateId();
    }
    delete data._id;
  }

  #_setProperties(this: Entity, data: EntityData) {
    this.validProperties.forEach((key: string) => {
      if (data[key] !== undefined) this[key] = data[key];
    });
  }

  #_setTimestamps(isNew: boolean) {
    const now = new Date();
    if (
      isNew &&
      this.validProperties.includes("createdAt") &&
      !this.createdAt
    ) {
      this.createdAt = now;
    }
  }

  #_validate(data: EntityData) {
    const valid = this.validator(data);
    if (!valid) {
      throw new ValidationError(`Invalid ${Entity.name}`, {
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

  static getActionDelta(old: any, _new: any) {
    const delta = {} as any;
    for (const action in _new) {
      if (this.actionProperties?.includes(action)) {
        if (old[action] !== _new[action]) {
          delta[action] = 1;
        }
      }
    }
    return delta;
  }

  static get actionProperties(): string[] {
    return [];
  }
}

export default Entity;
