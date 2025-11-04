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
 * Analyzes schema complexity
 */
function analyzeProperty(prop, ajv, rootSchema, depth = 0) {
  const result = {
    hasLocalRef: false,
    hasExternalRef: false,
    hasNestedObject: false,
    hasArray: false,
    hasEnum: false,
    hasUnionType: false,
    depth,
    details: [],
  };

  if (prop.$ref) {
    if (prop.$ref.startsWith("#")) {
      result.hasLocalRef = true;
      result.details.push(`Local ref: ${prop.$ref}`);

      const resolved = resolveLocalRef(prop.$ref, rootSchema);
      if (resolved) {
        const nested = analyzeProperty(resolved, ajv, rootSchema, depth + 1);
        result.hasNestedObject =
          result.hasNestedObject || nested.hasNestedObject;
        result.hasArray = result.hasArray || nested.hasArray;
      }
    } else {
      result.hasExternalRef = true;
      result.details.push(`External ref: ${prop.$ref}`);
    }
    return result;
  }

  if (prop.type === "array") {
    result.hasArray = true;
    if (prop.items) {
      const itemAnalysis = analyzeProperty(
        prop.items,
        ajv,
        rootSchema,
        depth + 1,
      );
      result.hasNestedObject =
        itemAnalysis.hasNestedObject || prop.items.type === "object";
      result.hasLocalRef = result.hasLocalRef || itemAnalysis.hasLocalRef;
    }
  }

  if (prop.type === "object" || prop.properties) {
    result.hasNestedObject = true;
    const propCount = Object.keys(prop.properties || {}).length;
    result.details.push(`Inline object with ${propCount} properties`);
  }

  if (prop.enum) {
    result.hasEnum = true;
    result.details.push(`Enum with ${prop.enum.length} values`);
  }

  if (Array.isArray(prop.type)) {
    result.hasUnionType = true;
    result.details.push(`Union type: ${prop.type.join("|")}`);
  }

  return result;
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

async function generateDetailedReport() {
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

  console.log("=== DETAILED TYPE COMPLEXITY REPORT ===\n");

  const complexSchemas = [];

  for (const [fileName, module] of schemas) {
    const schema = module.default;
    if (schema.$id === "definitions.json") continue;

    const schemaTitle = schema.title.replace(/\s+/g, "");
    const analysis = {
      name: schemaTitle,
      totalProps: Object.keys(schema.properties || {}).length,
      complexProps: [],
      hasLocalRefs: false,
      hasNestedObjects: false,
      hasArraysOfObjects: false,
    };

    for (const [propName, prop] of Object.entries(schema.properties || {})) {
      const propAnalysis = analyzeProperty(prop, ajv, schema);

      if (
        propAnalysis.hasLocalRef ||
        propAnalysis.hasNestedObject ||
        (propAnalysis.hasArray && propAnalysis.hasNestedObject) ||
        propAnalysis.depth > 0
      ) {
        analysis.complexProps.push({
          name: propName,
          ...propAnalysis,
        });

        if (propAnalysis.hasLocalRef) analysis.hasLocalRefs = true;
        if (propAnalysis.hasNestedObject) analysis.hasNestedObjects = true;
        if (propAnalysis.hasArray && propAnalysis.hasNestedObject)
          analysis.hasArraysOfObjects = true;
      }
    }

    if (analysis.complexProps.length > 0) {
      complexSchemas.push(analysis);
    }
  }

  // Sort by complexity
  complexSchemas.sort((a, b) => b.complexProps.length - a.complexProps.length);

  console.log(
    `Found ${complexSchemas.length} schemas with complex type definitions:\n`,
  );

  for (const schema of complexSchemas) {
    console.log(
      `\n${schema.name} (${schema.complexProps.length} complex properties):`,
    );

    const flags = [];
    if (schema.hasLocalRefs) flags.push("Local $refs");
    if (schema.hasNestedObjects) flags.push("Nested objects");
    if (schema.hasArraysOfObjects) flags.push("Arrays of objects");

    console.log(`  Complexity: ${flags.join(", ")}`);
    console.log(`  Properties:`);

    for (const prop of schema.complexProps) {
      const markers = [];
      if (prop.hasLocalRef) markers.push("LOCAL-REF");
      if (prop.hasExternalRef) markers.push("EXT-REF");
      if (prop.hasNestedObject) markers.push("NESTED-OBJ");
      if (prop.hasArray) markers.push("ARRAY");
      if (prop.hasUnionType) markers.push("UNION");
      if (prop.hasEnum) markers.push("ENUM");

      console.log(`    - ${prop.name}: [${markers.join(", ")}]`);
      if (prop.details.length > 0) {
        prop.details.forEach((detail) => console.log(`        ${detail}`));
      }
    }
  }

  console.log("\n\n=== SUMMARY ===");
  console.log(`Total schemas analyzed: ${schemas.size - 1}`); // -1 for definitions.json
  console.log(`Schemas with complex types: ${complexSchemas.length}`);
  console.log(
    `Schemas with local $refs: ${complexSchemas.filter((s) => s.hasLocalRefs).length}`,
  );
  console.log(
    `Schemas with nested objects: ${complexSchemas.filter((s) => s.hasNestedObjects).length}`,
  );
  console.log(
    `Schemas with arrays of objects: ${complexSchemas.filter((s) => s.hasArraysOfObjects).length}`,
  );
}

generateDetailedReport().catch(console.error);
