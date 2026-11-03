import { _, Ajv } from "ajv";
import addFormats from "ajv-formats";
import standaloneCode from "ajv/dist/standalone/index.js";
import { addLowerBoundTableKeyword } from "../../src/lib/lowerBoundTable.ts";

// Options that shape the emitted code. Strict options only add compile-time
// checks; the lint pass below turns them on.
const EMIT_OPTIONS = {
  allErrors: true,
  useDefaults: true,
  discriminator: true,
  allowUnionTypes: true,
  allowMatchingProperties: true,
  // Rejects NaN and Infinity for `number`, which validate today: a change in
  // what documents are accepted, not a schema-authoring check.
  strictNumbers: false,
  // `required` in `if`/`then` and `oneOf` branches names properties the parent
  // declares; that's the pattern, not a mistake.
  strictRequired: false,
  strictTypes: true,
  strictTuples: true,
  // Enforced by the lint pass instead. With `useDefaults` it also rejects a
  // `default` AJV won't apply inside a `oneOf`/`anyOf` branch, and costEntry's
  // properties are spread both at the top of Cost (defaults apply) and into
  // Ticket's `costs` `oneOf` (they don't).
  strictSchema: false,
};

const LINT_OPTIONS = {
  ...EMIT_OPTIONS,
  useDefaults: false,
  strictSchema: true,
};

// The CommonJS references standalone emits, each rewritten to an import from
// ./runtime.js. Formats become annotated calls: a bare property read is a side
// effect to a bundler, which would keep it from every unused validator.
const RUNTIME_REFERENCES = [
  {
    pattern: /require\("ajv\/dist\/runtime\/equal"\)\.default/g,
    importName: "equal",
    replace: () => "equal",
  },
  {
    pattern: /require\("ajv\/dist\/runtime\/ucs2length"\)\.default/g,
    importName: "ucs2length",
    replace: () => "ucs2length",
  },
  {
    pattern:
      /require\("ajv-formats\/dist\/formats"\)\.fullFormats(?:\["([^"]+)"\]|\.(\w+))/g,
    importName: "format",
    replace: (_match, quoted, dotted) =>
      `/* @__PURE__ */ format(${JSON.stringify(quoted ?? dotted)})`,
  },
];

function createAjv(schemas, options) {
  const ajv = new Ajv({ ...options, schemas });
  addFormats(ajv);
  addLowerBoundTableKeyword(ajv);
  return ajv;
}

/**
 * Compiles every schema under strict mode, so typo'd keywords and impossible
 * constraints fail generation instead of being ignored.
 */
export function lintSchemas(schemas) {
  const ajv = createAjv(schemas, LINT_OPTIONS);
  const failures = [];
  for (const schema of schemas) {
    try {
      ajv.compile(schema);
    } catch (error) {
      failures.push(`${schema.$id}: ${error.message}`);
    }
  }
  if (failures.length) {
    throw new Error(`Schemas fail strict mode:\n${failures.join("\n")}`);
  }
}

/**
 * One ESM module per schema, from its own AJV instance, so a bundle carries
 * only the validators it imports. Referenced schemas are inlined per module.
 */
export function generateValidatorModule(schemas, schema, banner) {
  const ajv = createAjv(schemas, {
    ...EMIT_OPTIONS,
    code: {
      source: true,
      esm: true,
      lines: false,
      formats: _`require("ajv-formats/dist/formats").fullFormats`,
    },
  });
  const source = standaloneCode(ajv, ajv.compile(schema));

  const used = new Set();
  let body = source.replace(/^"use strict";/, "");
  for (const { pattern, importName, replace } of RUNTIME_REFERENCES) {
    body = body.replace(pattern, (...match) => {
      used.add(importName);
      return replace(...match);
    });
  }

  if (/\brequire\(|\bnew Function\b|\beval\(/.test(body)) {
    throw new Error(
      `${schema.$id}: unmapped require, or eval, in validator code`,
    );
  }

  const imports = used.size
    ? `import { ${[...used].sort().join(", ")} } from "./runtime.js";\n`
    : "";
  return `${banner}\n${imports}${body}`;
}

export function generateValidatorDeclaration(banner) {
  return `${banner}
import type { Validator } from "./runtime.js";
export declare const validate: Validator;
export default validate;
`;
}
