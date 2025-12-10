/* eslint-disable */
import fs from "node:fs";
import path from "node:path";

const DIST_SCHEMAS_DIR = "dist/esm/schemas";

/**
 * Deep clone an object
 * @param {any} obj
 * @returns {any}
 */
function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Get a value from an object by JSON pointer path
 * @param {object} obj - The object to traverse
 * @param {string} pointer - JSON pointer path (e.g., "/definitions/id")
 * @returns {any}
 */
function getByPointer(obj, pointer) {
  const parts = pointer.split("/").filter(Boolean);
  let current = obj;
  for (const part of parts) {
    if (current === undefined || current === null) {
      throw new Error(`Cannot resolve pointer: ${pointer}`);
    }
    current = current[part];
  }
  return current;
}

/**
 * Resolve all $ref references in a schema
 * @param {object} schema - The schema to resolve
 * @param {object} definitions - The definitions object from definitions.json
 * @param {Set<string>} visited - Set of visited refs to detect circular references
 * @returns {object}
 */
function resolveRefs(schema, definitions, visited = new Set()) {
  if (schema === null || typeof schema !== "object") {
    return schema;
  }

  if (Array.isArray(schema)) {
    return schema.map((item) => resolveRefs(item, definitions, visited));
  }

  // Check if this object has a $ref
  if (schema.$ref) {
    const ref = schema.$ref;

    // Detect circular references
    if (visited.has(ref)) {
      throw new Error(`Circular reference detected: ${ref}`);
    }
    visited.add(ref);

    let resolved;

    if (ref.startsWith("definitions.json#")) {
      // External reference to definitions.json
      const pointer = ref.replace("definitions.json#", "");
      resolved = deepClone(getByPointer(definitions, pointer));
    } else if (ref.startsWith("#/")) {
      // Local reference within the same schema (e.g., #/$defs/securityMode)
      const pointer = ref.replace("#", "");
      resolved = deepClone(getByPointer(schema, pointer));

      // If we can't resolve it from the current object, it might be in the root schema
      // This is handled by the caller passing the full schema
    } else {
      throw new Error(`Unknown $ref format: ${ref}`);
    }

    // Recursively resolve any refs in the resolved definition
    resolved = resolveRefs(resolved, definitions, new Set(visited));

    // Merge any sibling properties with the resolved ref
    // (JSON Schema allows properties alongside $ref)
    const { $ref, ...siblings } = schema;
    if (Object.keys(siblings).length > 0) {
      return { ...resolved, ...siblings };
    }

    visited.delete(ref);
    return resolved;
  }

  // Recursively process all properties
  const result = {};
  for (const [key, value] of Object.entries(schema)) {
    result[key] = resolveRefs(value, definitions, visited);
  }
  return result;
}

/**
 * Resolve local refs (like #/$defs/securityMode) within a schema
 * @param {object} schema - The full schema object
 * @param {object} obj - The current object being processed
 * @param {Set<string>} visited - Set of visited refs
 * @returns {object}
 */
function resolveLocalRefs(schema, obj, visited = new Set()) {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => resolveLocalRefs(schema, item, visited));
  }

  if (obj.$ref && obj.$ref.startsWith("#/")) {
    const ref = obj.$ref;

    if (visited.has(ref)) {
      throw new Error(`Circular reference detected: ${ref}`);
    }
    visited.add(ref);

    const pointer = ref.replace("#", "");
    let resolved = deepClone(getByPointer(schema, pointer));
    resolved = resolveLocalRefs(schema, resolved, new Set(visited));

    const { $ref, ...siblings } = obj;
    if (Object.keys(siblings).length > 0) {
      return { ...resolved, ...siblings };
    }

    visited.delete(ref);
    return resolved;
  }

  const result = {};
  for (const [key, value] of Object.entries(obj)) {
    result[key] = resolveLocalRefs(schema, value, visited);
  }
  return result;
}

/**
 * Convert a value to JavaScript object literal syntax
 * @param {any} value - The value to stringify
 * @param {number} indent - Current indentation level
 * @returns {string}
 */
function toJsObjectString(value, indent = 0) {
  const spaces = "  ".repeat(indent);
  const nextSpaces = "  ".repeat(indent + 1);

  if (value === null) {
    return "null";
  }

  if (typeof value === "undefined") {
    return "undefined";
  }

  if (typeof value === "string") {
    // Use double quotes, escape as needed
    return JSON.stringify(value);
  }

  if (typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }

  if (Array.isArray(value)) {
    if (value.length === 0) {
      return "[]";
    }
    const items = value.map(
      (item) => `${nextSpaces}${toJsObjectString(item, indent + 1)}`,
    );
    return `[\n${items.join(",\n")},\n${spaces}]`;
  }

  if (typeof value === "object") {
    const keys = Object.keys(value);
    if (keys.length === 0) {
      return "{}";
    }
    const props = keys.map((key) => {
      // Use unquoted keys when valid JS identifiers, quoted otherwise
      const safeKey = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key)
        ? key
        : JSON.stringify(key);
      return `${nextSpaces}${safeKey}: ${toJsObjectString(value[key], indent + 1)}`;
    });
    return `{\n${props.join(",\n")},\n${spaces}}`;
  }

  return String(value);
}

/**
 * Process a single schema file
 * @param {string} filePath - Path to the schema file
 * @param {object} definitions - The definitions object
 */
async function processSchemaFile(filePath, definitions) {
  const module = await import(path.resolve(filePath));
  // Find the schema export - it's a named export now (e.g., alarmSchema)
  const schemaKey = Object.keys(module).find(
    (k) => k.endsWith("Schema") && typeof module[k] === "object",
  );
  const schema = deepClone(module.default || module[schemaKey]);

  // First resolve external refs (definitions.json)
  let resolved = resolveExternalRefs(schema, definitions);

  // Then resolve local refs (#/$defs/*)
  resolved = resolveLocalRefs(resolved, resolved);

  // Remove $defs since they're now inlined
  delete resolved.$defs;

  // Write the resolved schema as TypeScript with `as const`
  const output = `export default ${toJsObjectString(resolved)} as const;\n`;

  // Change file extension from .js to .ts
  const tsFilePath = filePath.replace(/\.js$/, ".ts");
  fs.writeFileSync(tsFilePath, output);

  // Delete the original .js file and its source map
  fs.unlinkSync(filePath);
  const mapPath = filePath + ".map";
  if (fs.existsSync(mapPath)) {
    fs.unlinkSync(mapPath);
  }

  console.log(`Resolved: ${path.basename(tsFilePath)}`);
}

/**
 * Resolve external $refs (definitions.json references)
 * @param {object} obj - The object to process
 * @param {object} definitions - The definitions object
 * @param {string[]} refStack - Stack of refs being resolved (for circular detection)
 * @returns {object}
 */
function resolveExternalRefs(obj, definitions, refStack = []) {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => resolveExternalRefs(item, definitions, refStack));
  }

  if (obj.$ref && obj.$ref.startsWith("definitions.json#")) {
    const ref = obj.$ref;

    // Check for circular reference in the current resolution chain
    if (refStack.includes(ref)) {
      throw new Error(
        `Circular reference detected: ${ref} (chain: ${refStack.join(" -> ")} -> ${ref})`,
      );
    }

    const pointer = ref.replace("definitions.json#", "");
    let resolved = deepClone(getByPointer(definitions, pointer));

    // Recursively resolve any refs in the resolved definition, tracking the chain
    resolved = resolveExternalRefs(resolved, definitions, [...refStack, ref]);

    const { $ref, ...siblings } = obj;
    if (Object.keys(siblings).length > 0) {
      return { ...resolved, ...siblings };
    }

    return resolved;
  }

  const result = {};
  for (const [key, value] of Object.entries(obj)) {
    // Each property starts fresh - no circular chain inheritance between siblings
    result[key] = resolveExternalRefs(value, definitions, refStack);
  }
  return result;
}

/**
 * Pre-resolve internal refs within the definitions object itself
 * (handles cases like $ref: "#/definitions/supportedNotifications/items")
 * @param {object} definitions - The definitions object
 * @returns {object} - Definitions with internal refs resolved
 */
function resolveDefinitionsInternalRefs(definitions) {
  const resolved = deepClone(definitions);

  function resolveInDef(obj, defStack = []) {
    if (obj === null || typeof obj !== "object") {
      return obj;
    }

    if (Array.isArray(obj)) {
      return obj.map((item) => resolveInDef(item, defStack));
    }

    if (obj.$ref && obj.$ref.startsWith("#/")) {
      const ref = obj.$ref;

      if (defStack.includes(ref)) {
        throw new Error(`Circular reference in definitions: ${ref}`);
      }

      const pointer = ref.replace("#", "");
      let inlined = deepClone(getByPointer(resolved, pointer));
      inlined = resolveInDef(inlined, [...defStack, ref]);

      const { $ref, ...siblings } = obj;
      if (Object.keys(siblings).length > 0) {
        return { ...inlined, ...siblings };
      }
      return inlined;
    }

    const result = {};
    for (const [key, value] of Object.entries(obj)) {
      result[key] = resolveInDef(value, defStack);
    }
    return result;
  }

  return resolveInDef(resolved);
}

async function main() {
  console.log("Resolving schema $ref references...\n");

  // Load definitions
  const definitionsPath = path.join(DIST_SCHEMAS_DIR, "definitions.js");
  const definitionsModule = await import(path.resolve(definitionsPath));
  // Schema exports are now named exports (e.g., definitionsSchema) instead of default
  let definitions =
    definitionsModule.default || definitionsModule.definitionsSchema;

  // First, resolve any internal refs within definitions itself
  definitions = resolveDefinitionsInternalRefs(definitions);

  // Get all schema files except definitions and index
  const schemaFiles = fs
    .readdirSync(DIST_SCHEMAS_DIR)
    .filter(
      (file) =>
        file.endsWith(".js") &&
        file !== "definitions.js" &&
        file !== "index.js",
    )
    .map((file) => path.join(DIST_SCHEMAS_DIR, file));

  // Process each schema
  for (const filePath of schemaFiles) {
    await processSchemaFile(filePath, definitions);
  }

  // Delete the definitions file and its source map (no longer needed)
  fs.unlinkSync(definitionsPath);
  const definitionsMapPath = definitionsPath + ".map";
  if (fs.existsSync(definitionsMapPath)) {
    fs.unlinkSync(definitionsMapPath);
  }
  console.log("\nDeleted: definitions.js (and source map)");

  // Update index.js: remove definitions export, change imports to .ts, convert to .ts file
  const indexPath = path.join(DIST_SCHEMAS_DIR, "index.js");
  if (fs.existsSync(indexPath)) {
    let indexContent = fs.readFileSync(indexPath, "utf-8");
    indexContent = indexContent
      .split("\n")
      .filter((line) => !line.includes("definitionsSchema"))
      // Change .js imports to .ts
      .map((line) => line.replace(/\.js(["'])/g, ".ts$1"))
      .join("\n");

    // Write as .ts file
    const tsIndexPath = path.join(DIST_SCHEMAS_DIR, "index.ts");
    fs.writeFileSync(tsIndexPath, indexContent);

    // Delete the old .js index and its source map
    fs.unlinkSync(indexPath);
    const indexMapPath = indexPath + ".map";
    if (fs.existsSync(indexMapPath)) {
      fs.unlinkSync(indexMapPath);
    }

    console.log("Created: index.ts (converted from index.js)");
  }

  console.log("\nSchema resolution complete!");
}

main().catch((err) => {
  console.error("Error resolving schemas:", err);
  process.exit(1);
});
