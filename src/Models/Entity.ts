import { Definitions } from "../schemas/definitions.json";
import ValidationError from "../Errors/ValidationError";
import { customAlphabet as generate } from "nanoid";
import { ValidateFunction, AnySchema } from "ajv";

type EntityData = {
  id?: string;
  _id?: string;
  [x: string]: any;
};

export interface EntityClass {
  validator: ValidateFunction<unknown>;
  schema: AnySchema;
  validProperties: string[];
  actionProperties?: string[];
  getActionDelta(old: any, _new: any): any;
}

type BaseEntity = {
  id?: Definitions["id"];
  _id?: Definitions["id"];
  type: string;
  createdAt?: Definitions["createdAt"];
  updatedAt?: Definitions["updatedAt"];
  [x: string]: any;
};

/**
 * @class Entity
 * @description
 * Base class for all Kohost entities. Provides a common interface for
 * interacting with entities. Validates constructor data against the
 * entity's schema.
 * @abstract
 *
 * @param {EntityData} data - Data to construct the entity with.
 *
 */

class Entity {
  static validator: ValidateFunction<unknown>;
  static schema: AnySchema;
  static validProperties: string[];
  static actionProperties?: string[];

  // id?: Definitions["id"];
  // createdAt?: Definitions["createdAt"];
  // updatedAt?: Definitions["updatedAt"];

  #_validator: ValidateFunction;

  constructor(data: EntityData) {
    if (!Entity.schema) throw new Error("Entity schema not defined");
    if (!Entity.validProperties)
      throw new Error("Entity validProperties not defined");
    if (!Entity.validator) throw new Error("Entity validator not defined");
    const isNew = data.id ? false : true;
    const dataCopy = { ...data };

    // copy the validator from the static class
    this.#_validator = Entity.validator;
    this.#validate(dataCopy);
    this.#setId(dataCopy);
    if (isNew) this.#setCreatedAt(dataCopy);
    this.#setUpdatedAt(dataCopy);
    Object.assign(this, dataCopy);
  }

  set #validator(validator: ValidateFunction) {
    this.#_validator = validator;
  }

  get #validator(): ValidateFunction {
    return this.#_validator;
  }

  #setId(data: EntityData): void {
    let id = data.id;
    if (!id && data._id) id = data._id;
    if (!id) id = Entity.#generateId();
    delete data._id;
    data.id = id;
  }

  #setCreatedAt(data: EntityData) {
    if (Entity.validProperties.includes("createdAt")) {
      data.createdAt = new Date();
    }
  }

  #setUpdatedAt(data: EntityData) {
    if (Entity.validProperties.includes("updatedAt")) {
      data.updatedAt = new Date();
    }
  }

  #validate(data: EntityData): void {
    const valid = this.#validator(data);
    if (!valid) {
      throw new ValidationError(`Invalid ${Entity.name}`, {
        cause: this.#validator.errors || [],
      });
    }
  }

  static #generateId(): string {
    const length = 8;
    const characters =
      "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const id = generate(characters, length)();
    return id;
  }

  static getActionDelta(old: any, _new: any) {
    const delta = {} as any;
    for (const action in _new) {
      if (Entity.actionProperties?.includes(action)) {
        if (old[action] !== _new[action]) {
          delta[action] = 1;
        }
      }
    }
    return delta;
  }
}

Entity.schema = {};
Entity.validProperties = [];

export default Entity;
