import { Ajv } from "ajv";
import addFormats from "ajv-formats";
import fs from "node:fs";
import path from "node:path";
import { isDeepStrictEqual } from "node:util";
import { describe, expect, it } from "vitest";

import * as validators from "../.generated/validate";
import {
  mutations,
  sample,
  WHOLE_DOCUMENT_VALUES,
  type Fixture,
} from "./support/schemaFixtures";

// Gates any change to how validators are built or shipped: the package's
// validators must agree with AJV compiling the same schemas at runtime, the
// way the package did before validators were precompiled, on verdict, the
// defaults-filled document and the raw error list.

const SCHEMA_DIR = path.join(import.meta.dirname, "../src/schemas");
const FRAGMENTS = new Set(["index.ts", "costEntry.ts"]);
const SEEDS = 12;
const FIXTURES_PER_SEED = 400;

const schemaFiles = fs
  .readdirSync(SCHEMA_DIR)
  .filter(
    (f) => f.endsWith(".ts") && !f.endsWith(".test.ts") && !FRAGMENTS.has(f),
  );

const schemas: Record<string, any>[] = await Promise.all(
  schemaFiles.map(async (file) => {
    const mod = await import(path.join(SCHEMA_DIR, file));
    if (file === "definitions.ts") return mod.default;
    const key = Object.keys(mod).find(
      (k) => k.endsWith("Schema") && typeof mod[k] === "object",
    );
    return mod[key!];
  }),
);

const registry = new Map(schemas.map((s) => [s.$id as string, s]));
const entitySchemas = schemas.filter((s) => s.$id !== "definitions.json");

// The keyword as the package defined it while validators compiled at runtime.
function referenceLowerBoundTable(params: { key: string }, rows: unknown[]) {
  let previous: number | undefined;
  for (const row of rows) {
    const value =
      typeof row === "object" && row !== null
        ? (row as Record<string, unknown>)[params.key]
        : undefined;
    if (typeof value !== "number") return false;
    if (previous === undefined ? value !== 0 : value <= previous) return false;
    previous = value;
  }
  return true;
}

const referenceAjv = new Ajv({
  allErrors: true,
  useDefaults: true,
  strict: false,
  allowMatchingProperties: true,
  allowUnionTypes: true,
  strictRequired: false,
  discriminator: true,
  schemas,
});
addFormats(referenceAjv);
referenceAjv.addKeyword({
  keyword: "lowerBoundTable",
  type: "array",
  schemaType: "object",
  validate: referenceLowerBoundTable,
});

type Validate = ((data: unknown) => boolean) & { errors?: unknown };

function candidateFor(schema: Record<string, any>): Validate {
  const name = `validate${schema.title.replace(/\s+/g, "")}`;
  return (validators as Record<string, Validate>)[name];
}

function outcome(validate: Validate, data: unknown) {
  const doc = structuredClone(data);
  const valid = validate(doc);
  return { valid, doc, errors: structuredClone(validate.errors ?? null) };
}

function mismatches(
  reference: Validate,
  candidate: Validate,
  fixtures: Fixture[],
) {
  const found: string[] = [];
  for (const { label, data } of fixtures) {
    const want = outcome(reference, data);
    const got = outcome(candidate, data);
    if (!isDeepStrictEqual(want, got)) {
      found.push(
        `${label}\n  want ${JSON.stringify(want).slice(0, 600)}\n  got  ${JSON.stringify(got).slice(0, 600)}`,
      );
      if (found.length >= 5) break;
    }
  }
  return found;
}

function fixturesFor(schema: Record<string, any>): Fixture[] {
  const fixtures: Fixture[] = WHOLE_DOCUMENT_VALUES.map((data) => ({
    label: `document=${JSON.stringify(data)}`,
    data,
  }));
  for (let seed = 0; seed < SEEDS; seed++) {
    const base = sample(schema, schema.$id, registry, seed);
    fixtures.push({ label: `seed ${seed}`, data: base });
    fixtures.push(...mutations(base, `seed ${seed}`, FIXTURES_PER_SEED));
  }
  return fixtures;
}

describe("precompiled validators match runtime-compiled AJV", () => {
  it("exports a validator for every schema", () => {
    const missing = entitySchemas
      .filter((s) => typeof candidateFor(s) !== "function")
      .map((s) => s.title);
    expect(missing).toEqual([]);
  });

  it("derives at least one valid document per schema from the fixtures", () => {
    const withoutValid = entitySchemas
      .filter((schema) => {
        const reference = referenceAjv.getSchema(schema.$id)!;
        return !fixturesFor(schema).some(({ data }) =>
          reference(structuredClone(data)),
        );
      })
      .map((s) => s.title);
    expect(withoutValid).toEqual([]);
  });

  it.each(entitySchemas.map((s) => [s.title, s] as const))(
    "%s",
    (_title, schema) => {
      const reference = referenceAjv.getSchema(schema.$id) as Validate;
      expect(
        mismatches(reference, candidateFor(schema), fixturesFor(schema)),
      ).toEqual([]);
    },
  );
});

describe("lowerBoundTable", () => {
  const organization = registry.get("organization.json")!;
  const tiers = (...amounts: unknown[]) =>
    amounts.map((minAmount) => ({ minAmount, percent: 10 }));
  const tables: [string, unknown][] = [
    ["empty table", []],
    ["single zero row", tiers(0)],
    ["ascending rows", tiers(0, 500, 1000)],
    ["first row above zero", tiers(1)],
    ["repeated key", tiers(0, 0)],
    ["descending key", tiers(0, 500, 300)],
    ["string key", tiers("0")],
    ["missing key", [{ percent: 10 }]],
    ["null row", [null]],
    ["number row", [5]],
    ["array row", [[0]]],
    ["not an array", "tiers"],
  ];

  const base = sample(organization, organization.$id, registry, 0) as any;
  const reference = referenceAjv.getSchema("organization.json") as Validate;

  it.each(tables)("%s", (_label, markupTiers) => {
    const data = structuredClone(base);
    data.features ??= {};
    data.features.Concierge ??= {};
    data.features.Concierge.costs = { markupTiers };
    const want = outcome(reference, data);
    expect(outcome(validators.validateOrganization as Validate, data)).toEqual(
      want,
    );
  });

  it("is reachable at features.Concierge.costs.markupTiers", () => {
    const data = structuredClone(base);
    data.features = { Concierge: { costs: { markupTiers: tiers(1) } } };
    expect(reference(data)).toBe(false);
    expect(JSON.stringify(reference.errors)).toContain("lowerBoundTable");
  });
});
