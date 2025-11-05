export function generateSchemaDoc(schemaPath, ajv) {
  const schema = ajv.getSchema(schemaPath)?.schema;
  if (!schema) throw new Error(`Schema not found: ${schemaPath}`);

  const lines = [];
  lines.push("/**");
  const typeName =
    schema.title?.replace(/\s+/g, "") || schemaPath.split(".")[0];
  lines.push(
    ` * @typedef {Object} ${typeName}Data ${schema.description ?? ""}`,
  );
  processProperties(
    schema.properties || {},
    lines,
    schema.required || [],
    ajv,
    "",
    schema,
  );
  lines.push(" */");
  return lines.join("\n");
}

function processProperties(
  properties,
  lines,
  required,
  ajv,
  prefix = "",
  rootSchema,
) {
  for (const [propName, prop] of Object.entries(properties)) {
    const fullPropName = prefix ? `${prefix}.${propName}` : propName;
    const isRequired = required.includes(propName);
    const type = getPropertyType(prop, ajv, rootSchema);
    const descriptions = getDescriptions(prop, ajv);

    lines.push(
      ` * @property {${type}} ${!isRequired ? "[" + fullPropName + "]" : fullPropName}${descriptions ? ` - ${descriptions}` : ""}`,
    );

    // if (hasNestedProperties(prop)) {
    //   processProperties(
    //     prop.properties,
    //     lines,
    //     prop.required || [],
    //     ajv,
    //     fullPropName,
    //     rootSchema
    //   );
    // }
  }
}

function getPropertyType(prop, ajv, rootSchema) {
  if (prop.$ref) {
    // Try to resolve the reference
    let refSchema;
    let resolvedRootSchema = rootSchema;

    // Handle local references (e.g., #/$defs/setpoint or #/properties/supportedHvacModes/items)
    if (prop.$ref.startsWith("#")) {
      refSchema = resolveLocalRef(prop.$ref, rootSchema);
    } else {
      // Handle external references (e.g., definitions.json#/definitions/id or definitions.json#/definitions/supportedNotifications/items)
      const [schemaFile, jsonPointer] = prop.$ref.split("#");

      // Get the base schema
      const baseSchema = ajv.getSchema(schemaFile)?.schema;
      resolvedRootSchema = baseSchema; // Update root schema context for nested references

      // If there's a JSON pointer after the #, resolve it within the external schema
      if (baseSchema && jsonPointer) {
        refSchema = resolveLocalRef("#" + jsonPointer, baseSchema);
      } else {
        refSchema = baseSchema;
      }
    }

    if (!refSchema) return "any";

    // Recursively process the resolved schema to handle nested $refs
    if (refSchema.$ref) {
      return getPropertyType(refSchema, ajv, resolvedRootSchema);
    }

    // For top-level type references, preserve the object structure
    if (refSchema.type === "object" || refSchema.properties) {
      const props = Object.entries(refSchema.properties || {})
        .map(([key, value]) => {
          // Recursively resolve nested references using the correct root schema context
          const type = getPropertyType(value, ajv, resolvedRootSchema);
          const required = refSchema.required?.includes(key);
          return `${key}${required ? "" : "?"}: ${type}`;
        })
        .join(", ");
      return `{${props}}`;
    }

    return getTypeFromSchema(refSchema, ajv, resolvedRootSchema);
  }
  return getTypeFromSchema(prop, ajv, rootSchema);
}

/**
 * Resolves a JSON pointer reference within a schema
 * @param {string} ref - The reference string (e.g., "#/$defs/setpoint" or "#/properties/supportedHvacModes/items")
 * @param {Object} rootSchema - The root schema to resolve against
 * @returns {Object|null} The resolved schema or null
 */
function resolveLocalRef(ref, rootSchema) {
  if (!ref || !ref.startsWith("#")) return null;

  // Remove the leading # and split by /
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

function getTypeFromSchema(schema, ajv, rootSchema) {
  if (schema.type === "array") {
    return `${getPropertyType(schema.items, ajv, rootSchema)}[]`;
  }

  if (schema.enum) {
    return formatEnumType(schema.enum);
  }

  if (Array.isArray(schema.type)) {
    return schema.enum
      ? formatEnumType(schema.enum)
      : formatMultipleTypes(schema.type);
  }

  if (hasNestedProperties(schema)) {
    return formatObjectType(schema, ajv, rootSchema);
  }

  return schema.type === "integer" ? "number" : schema.type || "any";
}

function hasNestedProperties(schema) {
  return (schema.type === "object" || !schema.type) && schema.properties;
}

function formatEnumType(enumValues) {
  const values = enumValues
    .filter((v) => v !== null)
    .map((v) => (typeof v === "string" ? `"${v}"` : JSON.stringify(v)));
  return values.length === 1 ? values[0] : `(${values.join("|")})`;
}

function formatMultipleTypes(types) {
  const hasNull = types.includes("null");
  const formattedTypes = types
    .filter((t) => t !== "null")
    .map((t) => (t === "integer" ? "number" : t));

  // If there's only one non-null type and it has null, return "type | null"
  if (formattedTypes.length === 1 && hasNull) {
    return `(${formattedTypes[0]}|null)`;
  }

  // If there are multiple non-null types
  if (formattedTypes.length > 1) {
    return hasNull
      ? `(${formattedTypes.join("|")}|null)`
      : `(${formattedTypes.join("|")})`;
  }

  return formattedTypes[0];
}

function formatObjectType(schema, ajv, rootSchema) {
  const props = Object.entries(schema.properties || {})
    .map(([key, value]) => {
      const type = getPropertyType(value, ajv, rootSchema);
      const required = schema.required?.includes(key);
      return `${key}${required ? "" : "?"}: ${type}`;
    })
    .join(", ");
  return `{${props}}`;
}

function getDescriptions(prop, ajv) {
  const descriptions = [];

  if (prop.$ref) {
    const refSchema = ajv.getSchema(prop.$ref)?.schema;
    if (refSchema?.description) descriptions.push(refSchema.description);
  }

  if (prop.description) descriptions.push(prop.description);
  if ("default" in prop)
    descriptions.push(`Default: ${JSON.stringify(prop.default)}`);

  return descriptions.length > 0 ? descriptions.join(". ") : "";
}

/**
 *
 * @param {string[]} pathParams
 * @param {"get" | "put" | "post" | "delete"} httpMethod
 */
export function generateCommandDataDoc(pathParams, httpMethod) {
  if (httpMethod === "get" && pathParams.length === 0)
    return "@property {null} [data] - The body to include in the command";

  const dataParams = pathParams.reduce(
    (acc, param) => {
      acc[param] = "string";
      return acc;
    },
    { "[key: string]": "any" },
  );

  const dataParamsCode = Object.entries(dataParams)
    .map(([param, type]) => `${param}: ${type}`)
    .join(", ");

  const dataParamsJsdoc = `@property {{${dataParamsCode}}} data - The body to include in the command`;

  return dataParamsJsdoc;
}
