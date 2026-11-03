// Deterministic documents derived from the schemas themselves, so every schema
// and every keyword it uses gets exercised without hand-writing fixtures for
// each of them. Documents need not be valid: a validator must agree with the
// reference on rejections and their error lists too.

type Schema = Record<string, any> | boolean;
type Registry = Map<string, Record<string, any>>;

const STRING_CANDIDATES = [
  "x",
  "usr_1",
  "propertyId:oldId",
  "+15551234567",
  "#a1b2c3",
  "12:30",
  "2026-01-02",
  "2026-01-02T03:04:05.000Z",
  "America/New_York",
  "https://example.com/a",
  "a@example.com",
  "ABC123",
  "1",
];

const FORMAT_SAMPLES: Record<string, string> = {
  "date-time": "2026-01-02T03:04:05.000Z",
  date: "2026-01-02",
  time: "03:04:05Z",
  email: "a@example.com",
  uri: "https://example.com/a",
};

// Values swapped in at every path: wrong types, edge numbers, malformed
// formats, and shapes that hit discriminator and additionalProperties paths.
export const MUTATION_VALUES: unknown[] = [
  null,
  0,
  -1,
  1.5,
  2 ** 53,
  Number.NaN,
  Number.POSITIVE_INFINITY,
  "",
  "x",
  "not-a-date",
  "2026-02-30T25:61:00Z",
  "not an email",
  "\u{1F600}\u{1F600}",
  true,
  false,
  [],
  [null],
  [{ minAmount: 0 }, { minAmount: 0 }],
  {},
  { type: "zzz" },
];

export function resolveRef(
  ref: string,
  base: string,
  registry: Registry,
): { schema: Schema; base: string } {
  const [file, pointer = ""] = ref.split("#");
  const docId = file === "" ? base : file;
  const doc = registry.get(docId);
  if (!doc) throw new Error(`Unknown $ref document ${docId} (from ${base})`);
  let node: any = doc;
  for (const part of pointer.split("/").filter(Boolean)) {
    node = node[part.replace(/~1/g, "/").replace(/~0/g, "~")];
    if (node === undefined) throw new Error(`Unresolvable $ref ${ref}`);
  }
  return { schema: node, base: docId };
}

function pick<T>(items: T[], seed: number): T {
  return items[seed % items.length];
}

function sampleString(schema: Record<string, any>, seed: number): string {
  if (schema.format && FORMAT_SAMPLES[schema.format]) {
    return FORMAT_SAMPLES[schema.format];
  }
  let value = "x";
  if (schema.pattern) {
    const re = new RegExp(schema.pattern, "u");
    value = STRING_CANDIDATES.find((c) => re.test(c)) ?? "x";
  } else if (seed % 3 === 1) {
    value = pick(STRING_CANDIDATES, seed);
  }
  if (schema.minLength && value.length < schema.minLength) {
    value = value.padEnd(schema.minLength, "a");
  }
  if (schema.maxLength && value.length > schema.maxLength) {
    value = value.slice(0, schema.maxLength);
  }
  return value;
}

function sampleNumber(schema: Record<string, any>, integer: boolean): number {
  let value = 1;
  if (typeof schema.minimum === "number") value = schema.minimum;
  if (typeof schema.exclusiveMinimum === "number") {
    value = schema.exclusiveMinimum + 1;
  }
  if (typeof schema.maximum === "number" && value > schema.maximum) {
    value = schema.maximum;
  }
  return integer ? Math.ceil(value) : value;
}

export function sample(
  schema: Schema,
  base: string,
  registry: Registry,
  seed: number,
  depth = 0,
): unknown {
  if (schema === true) return "x";
  if (schema === false || depth > 8) return undefined;
  if (schema.$ref) {
    const target = resolveRef(schema.$ref, base, registry);
    return sample(target.schema, target.base, registry, seed, depth + 1);
  }
  if ("const" in schema) return structuredClone(schema.const);
  if (schema.enum) return structuredClone(pick(schema.enum, seed));
  const branches = schema.oneOf ?? schema.anyOf;
  if (branches) {
    const merged = { ...schema, oneOf: undefined, anyOf: undefined };
    const branch = sample(
      pick(branches, seed),
      base,
      registry,
      seed,
      depth + 1,
    );
    if (!merged.properties && !merged.type) return branch;
    const own = sample(merged, base, registry, seed, depth + 1);
    return isPlainObject(own) && isPlainObject(branch)
      ? { ...own, ...branch }
      : branch;
  }
  if (schema.allOf) {
    const own = sample(
      { ...schema, allOf: undefined },
      base,
      registry,
      seed,
      depth + 1,
    );
    return schema.allOf.reduce((acc: unknown, part: Schema) => {
      const value = sample(part, base, registry, seed, depth + 1);
      return isPlainObject(acc) && isPlainObject(value)
        ? { ...acc, ...value }
        : acc;
    }, own);
  }

  const type = Array.isArray(schema.type)
    ? pick(schema.type, seed)
    : schema.type;
  const inferred =
    schema.properties || schema.required
      ? "object"
      : schema.items
        ? "array"
        : undefined;
  switch (type ?? inferred) {
    case "object": {
      const result: Record<string, unknown> = {};
      const required: string[] = schema.required ?? [];
      for (const [key, prop] of Object.entries<Schema>(
        schema.properties ?? {},
      )) {
        const isRequired = required.includes(key);
        const hasDefault = typeof prop === "object" && "default" in prop;
        // Odd seeds leave optional properties out, so defaults get filled in.
        if (!isRequired && (seed % 2 === 1 || (hasDefault && seed % 4 === 3))) {
          continue;
        }
        const value = sample(
          prop,
          base,
          registry,
          seed + key.length,
          depth + 1,
        );
        if (value !== undefined) result[key] = value;
      }
      for (const key of required) {
        if (!(key in result)) result[key] = "x";
      }
      return result;
    }
    case "array": {
      if (schema.items === undefined || Array.isArray(schema.items)) return [];
      const count = Math.max(schema.minItems ?? 0, seed % 3 === 2 ? 0 : 1);
      const items = Array.from({ length: count }, (_, i) =>
        sample(schema.items, base, registry, seed + i, depth + 1),
      );
      if (schema.lowerBoundTable) {
        return items.map((item, i) =>
          isPlainObject(item)
            ? { ...item, [schema.lowerBoundTable.key]: i * 100 }
            : item,
        );
      }
      return items;
    }
    case "string":
      return sampleString(schema, seed);
    case "integer":
      return sampleNumber(schema, true);
    case "number":
      return sampleNumber(schema, false);
    case "boolean":
      return seed % 2 === 0;
    case "null":
      return null;
    default:
      return "default" in schema ? structuredClone(schema.default) : undefined;
  }
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

type Path = (string | number)[];

export function collectPaths(value: unknown, maxDepth = 5): Path[] {
  const paths: Path[] = [];
  const walk = (node: unknown, path: Path) => {
    if (path.length > maxDepth) return;
    if (path.length > 0) paths.push(path);
    if (Array.isArray(node))
      node.forEach((child, i) => walk(child, [...path, i]));
    else if (isPlainObject(node)) {
      for (const [key, child] of Object.entries(node))
        walk(child, [...path, key]);
    }
  };
  walk(value, []);
  return paths;
}

function setAt(doc: unknown, path: Path, value: unknown, remove: boolean) {
  const copy = structuredClone(doc);
  let node: any = copy;
  for (const part of path.slice(0, -1)) node = node[part];
  const last = path[path.length - 1];
  if (remove) {
    if (Array.isArray(node)) node.splice(last as number, 1);
    else delete node[last];
  } else {
    node[last] = value;
  }
  return copy;
}

export interface Fixture {
  label: string;
  data: unknown;
}

// Every path of the base document is removed, swapped for each mutation
// value, and (for objects) given an unknown key. `stride` thins large
// documents deterministically so the run stays fast.
export function mutations(
  base: unknown,
  label: string,
  maxFixtures: number,
): Fixture[] {
  const fixtures: Fixture[] = [];
  const paths = collectPaths(base);
  for (const path of paths) {
    fixtures.push({
      label: `${label} -${path.join(".")}`,
      data: setAt(base, path, undefined, true),
    });
    for (const value of MUTATION_VALUES) {
      fixtures.push({
        label: `${label} ${path.join(".")}=${String(value)}`,
        data: setAt(base, path, value, false),
      });
    }
  }
  for (const path of [[], ...paths]) {
    const target = path.reduce<any>((node, part) => node?.[part], base);
    if (isPlainObject(target)) {
      const copy = structuredClone(base) as any;
      const node = path.reduce<any>((n, part) => n[part], copy);
      node.__unknown__ = 1;
      fixtures.push({
        label: `${label} ${path.join(".")}+__unknown__`,
        data: copy,
      });
    }
  }
  if (fixtures.length <= maxFixtures) return fixtures;
  const stride = fixtures.length / maxFixtures;
  return Array.from(
    { length: maxFixtures },
    (_, i) => fixtures[Math.floor(i * stride)],
  );
}

export const WHOLE_DOCUMENT_VALUES: unknown[] = [
  undefined,
  null,
  0,
  "x",
  true,
  [],
  {},
  { type: "zzz" },
];
