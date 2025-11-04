/* eslint-disable */
import { Ajv } from "ajv";
import addFormats from "ajv-formats";
import fs from "node:fs";

/**
 * Resolves a JSON pointer reference within a schema
 */
function resolveLocalRef(ref, rootSchema) {
  if (!ref || !ref.startsWith("#")) return null;
  const path = ref
    .substring(1)
    .split("/")
    .filter((p) => p);
  let current = rootSchema;
  for (const segment of path) {
    if (!current || typeof current !== "object") return null;
    current = current[segment];
  }
  return current;
}

/**
 * Gets the expected TypeScript type from a schema property
 */
function getExpectedType(prop, ajv, rootSchema) {
  if (prop.$ref) {
    let refSchema;
    if (prop.$ref.startsWith("#")) {
      refSchema = resolveLocalRef(prop.$ref, rootSchema);
    } else {
      refSchema = ajv.getSchema(prop.$ref)?.schema;
    }

    if (!refSchema) return "any";

    if (refSchema.$ref) {
      return getExpectedType(refSchema, ajv, rootSchema);
    }

    if (refSchema.type === "object" || refSchema.properties) {
      return getExpectedTypeFromSchema(refSchema, ajv, rootSchema);
    }

    return getExpectedTypeFromSchema(refSchema, ajv, rootSchema);
  }
  return getExpectedTypeFromSchema(prop, ajv, rootSchema);
}

function getExpectedTypeFromSchema(schema, ajv, rootSchema) {
  if (schema.type === "array") {
    return getExpectedType(schema.items, ajv, rootSchema) + "[]";
  }

  if (schema.enum) {
    const values = schema.enum.filter((v) => v !== null);
    const hasNull = schema.enum.includes(null);
    if (values.length === 0) return "null";
    const formatted = values
      .map((v) => (typeof v === "string" ? `"${v}"` : JSON.stringify(v)))
      .join("|");
    return hasNull
      ? `(${formatted}|null)`
      : values.length === 1
        ? formatted
        : `(${formatted})`;
  }

  if (Array.isArray(schema.type)) {
    const hasNull = schema.type.includes("null");
    const types = schema.type
      .filter((t) => t !== "null")
      .map((t) => (t === "integer" ? "number" : t));
    if (types.length === 1 && hasNull) {
      return `(${types[0]}|null)`;
    }
    if (types.length > 1) {
      return hasNull ? `(${types.join("|")}|null)` : `(${types.join("|")})`;
    }
    return types[0];
  }

  if (schema.type === "object" || schema.properties) {
    return "object";
  }

  return schema.type === "integer" ? "number" : schema.type || "any";
}

async function loadSchemas() {
  const schemaFiles = fs
    .readdirSync("src/schemas")
    .filter((file) => file.endsWith(".js"));

  const modules = await Promise.all(
    schemaFiles.map(async (file) => {
      const module = await import(`../src/schemas/${file}`);
      return [file, module];
    }),
  );

  return new Map(modules);
}

async function checkTypeAccuracy() {
  const schemas = await loadSchemas();
  const ajv = new Ajv({
    allErrors: true,
    useDefaults: true,
    strict: false,
    allowMatchingProperties: true,
    allowUnionTypes: true,
    strictRequired: false,
    schemas: Array.from(schemas.entries()).map(([fileName, module]) => {
      return module.default;
    }),
  });

  addFormats(ajv);

  const issues = [];

  for (const [fileName, module] of schemas) {
    const schema = module.default;
    if (schema.$id === "definitions.json") continue;

    const schemaTitle = schema.title.replace(/\s+/g, "");
    const modelFileName =
      schemaTitle.charAt(0).toLowerCase() + schemaTitle.slice(1);

    console.log(`\nChecking ${schemaTitle}...`);

    // Read the generated model file
    const modelPath = `src/models/${modelFileName}.js`;
    if (!fs.existsSync(modelPath)) {
      issues.push({
        schema: schemaTitle,
        issue: "Model file not found",
        file: modelPath,
      });
      continue;
    }

    const modelContent = fs.readFileSync(modelPath, "utf-8");

    // Check each property
    for (const [propName, prop] of Object.entries(schema.properties || {})) {
      const expectedType = getExpectedType(prop, ajv, schema);

      // Look for the property in the JSDoc
      // Match both required and optional properties, handling nested braces
      const lines = modelContent.split("\n");
      let actualType = null;

      for (const line of lines) {
        if (
          line.includes(`@property`) &&
          (line.includes(` ${propName} `) ||
            line.includes(` [${propName}]`) ||
            line.endsWith(` ${propName}`) ||
            line.endsWith(` [${propName}]`))
        ) {
          // Extract type between first { and matching } with brace counting
          const propIndex = line.indexOf("@property");
          let braceCount = 0;
          let startIndex = -1;
          let endIndex = -1;

          for (let i = propIndex; i < line.length; i++) {
            if (line[i] === "{") {
              if (startIndex === -1) startIndex = i + 1;
              braceCount++;
            } else if (line[i] === "}") {
              braceCount--;
              if (braceCount === 0 && startIndex !== -1) {
                endIndex = i;
                break;
              }
            }
          }

          if (startIndex !== -1 && endIndex !== -1) {
            actualType = line.substring(startIndex, endIndex).trim();
            break;
          }
        }
      }

      const match = actualType ? [null, actualType] : null;

      if (!match) {
        issues.push({
          schema: schemaTitle,
          property: propName,
          issue: "Property not found in JSDoc",
          expected: expectedType,
        });
        continue;
      }

      const foundType = match[1].trim();

      // Normalize types for comparison
      const normalizeType = (type) =>
        type.replace(/\s+/g, "").replace(/\(/g, "(").replace(/\)/g, ")");

      if (normalizeType(foundType) === "any" && expectedType !== "any") {
        issues.push({
          schema: schemaTitle,
          property: propName,
          issue: "Type is 'any' but should be more specific",
          expected: expectedType,
          actual: foundType,
        });
      }
    }
  }

  console.log("\n\n=== TYPE ACCURACY REPORT ===\n");

  if (issues.length === 0) {
    console.log("✓ All types are accurate!");
  } else {
    console.log(`Found ${issues.length} issue(s):\n`);

    const bySchema = {};
    for (const issue of issues) {
      if (!bySchema[issue.schema]) {
        bySchema[issue.schema] = [];
      }
      bySchema[issue.schema].push(issue);
    }

    for (const [schema, schemaIssues] of Object.entries(bySchema)) {
      console.log(`\n${schema}:`);
      for (const issue of schemaIssues) {
        console.log(`  - ${issue.property || "N/A"}: ${issue.issue}`);
        if (issue.expected) {
          console.log(`    Expected: ${issue.expected}`);
        }
        if (issue.actual) {
          console.log(`    Actual: ${issue.actual}`);
        }
      }
    }
  }

  return issues;
}

checkTypeAccuracy().catch(console.error);
