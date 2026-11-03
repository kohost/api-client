import { describe, expect, it } from "vitest";

import { ValidationError } from "../.generated/errors/index.js";
import { MediaFile, Space, User } from "../.generated/models/index";

const user = { id: "usr_1", firstName: "Ada", lastName: "Lovelace" };

function thrown(construct: () => unknown): ValidationError {
  try {
    construct();
  } catch (error) {
    return error as ValidationError;
  }
  throw new Error("expected the constructor to throw");
}

describe("constructing a model", () => {
  it("fills defaults into the data and onto the model", () => {
    const data: Record<string, unknown> = { ...user };
    const model = new User(data as never);
    expect(data.type).toBe("user");
    expect(data.permissions).toEqual([]);
    expect(model.type).toBe("user");
    expect(model.permissions).toEqual([]);
  });

  it("names the failing path and reason in the ValidationError message", () => {
    const error = thrown(
      () => new User({ ...user, email: "not an email", gender: "x" } as never),
    );
    expect(error).toBeInstanceOf(ValidationError);
    expect(error.statusCode).toBe(400);
    expect(error.message).toBe(
      'Invalid User: /email must match format "email"; /gender must be equal to one of the allowed values: "male", "female"',
    );
  });

  it("names a missing required property and an unknown one", () => {
    const error = thrown(
      () => new User({ id: "usr_1", firstName: "Ada", nickname: "A" } as never),
    );
    expect(error.message).toBe(
      "Invalid User: (root) must have required property 'lastName'; (root) must NOT have additional properties: nickname",
    );
  });

  it("names the model by its schema title, which minification can't rename", () => {
    const Minified = class e extends User {};
    const error = thrown(() => new Minified({ ...user, gender: "x" } as never));
    expect(error.message).toMatch(/^Invalid User: /);
  });

  it("keeps the raw AJV error array on cause", () => {
    const error = thrown(
      () => new User({ ...user, email: "not an email" } as never),
    );
    expect(error.cause).toEqual([
      {
        instancePath: "/email",
        schemaPath: "#/properties/email/format",
        keyword: "format",
        params: { format: "email" },
        message: 'must match format "email"',
      },
    ]);
  });

  it("lists at most ten errors", () => {
    const data = Object.fromEntries(
      Array.from({ length: 12 }, (_, i) => [`extra${i}`, i]),
    );
    const error = thrown(() => new User({ ...user, ...data } as never));
    expect(error.message.split("; ")).toHaveLength(11);
    expect(error.message).toMatch(/; and 2 more$/);
  });

  it("rejects a Space whose devices are not objects", () => {
    const space = { id: "spc_1", name: "Room 101", type: "space" };
    expect(() => new Space({ ...space, devices: [5] } as never)).toThrow(
      ValidationError,
    );
  });
});

describe("model schema and validator", () => {
  it("expose the schema on the prototype", () => {
    expect(User.prototype.schema.$id).toBe("user.json");
    expect(new User({ ...user } as never).schemaProperties).toEqual(
      Object.keys(User.prototype.schema.properties),
    );
  });

  it("expose a callable validator on the prototype", () => {
    const validate = MediaFile.prototype.validator;
    expect(validate({ url: "https://example.com/a.png" })).toBe(true);
    expect(validate({ url: 5 })).toBe(false);
    expect(validate.errors?.[0]?.instancePath).toBe("/url");
  });
});
