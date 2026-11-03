import type { AnySchema, ErrorObject } from "ajv";
import { ValidationError } from "../errors/validationError";
import type { Validator } from "../validators/runtime";

const MAX_LISTED_ERRORS = 10;
const MAX_LISTED_VALUES = 5;

function describeError({
  instancePath,
  message,
  keyword,
  params,
}: ErrorObject) {
  let detail = "";
  if (keyword === "additionalProperties") {
    detail = `: ${String(params.additionalProperty)}`;
  } else if (keyword === "enum" && Array.isArray(params.allowedValues)) {
    const values = params.allowedValues as unknown[];
    const listed = values
      .slice(0, MAX_LISTED_VALUES)
      .map((v) => JSON.stringify(v));
    if (values.length > MAX_LISTED_VALUES) listed.push("…");
    detail = `: ${listed.join(", ")}`;
  }
  return `${instancePath || "(root)"} ${message ?? `fails ${keyword}`}${detail}`;
}

/**
 * `Invalid <Model>: <path> <reason>; …`. Paths are JSON Pointers into the
 * constructor's data.
 */
function describeValidationErrors(
  title: string,
  errors: ErrorObject[] | null | undefined,
): string {
  if (!errors?.length) return `Invalid ${title}`;
  const listed = errors.slice(0, MAX_LISTED_ERRORS).map(describeError);
  if (errors.length > MAX_LISTED_ERRORS) {
    listed.push(`and ${errors.length - MAX_LISTED_ERRORS} more`);
  }
  return `Invalid ${title}: ${listed.join("; ")}`;
}

export class Entity {
  get schema(): AnySchema {
    throw new Error("Schema is not defined");
  }

  get validator(): Validator {
    throw new Error("Validator is not defined");
  }

  constructor(data: unknown) {
    this.#validate(data);
  }

  get schemaProperties(): string[] {
    const schema = this.schema;
    if (
      typeof schema === "object" &&
      schema !== null &&
      "properties" in schema
    ) {
      return Object.keys(schema.properties as Record<string, unknown>);
    }
    return [];
  }

  // The schema title, not `constructor.name`, which minifiers rename.
  get #modelName(): string {
    const { schema } = this;
    return typeof schema === "object" && typeof schema.title === "string"
      ? schema.title.replace(/\s+/g, "")
      : this.constructor.name;
  }

  #validate(data: unknown) {
    const validator = this.validator;
    if (!validator(data)) {
      throw new ValidationError(
        describeValidationErrors(this.#modelName, validator.errors),
        { cause: validator.errors },
      );
    }
  }
}
