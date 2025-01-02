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
  processProperties(schema.properties || {}, lines, schema.required || [], ajv);
  lines.push(" */");
  return lines.join("\n");
}

function processProperties(properties, lines, required, ajv, prefix = "") {
  for (const [propName, prop] of Object.entries(properties)) {
    const fullPropName = prefix ? `${prefix}.${propName}` : propName;
    const isRequired = required.includes(propName);
    const type = getPropertyType(prop, ajv);
    const descriptions = getDescriptions(prop, ajv);

    lines.push(
      ` * @property {${type}} ${!isRequired ? "[" + fullPropName + "]" : fullPropName}${descriptions ? ` - ${descriptions}` : ""}`,
    );

    if (hasNestedProperties(prop)) {
      processProperties(
        prop.properties,
        lines,
        prop.required || [],
        ajv,
        fullPropName,
      );
    }
  }
}

function getPropertyType(prop, ajv) {
  if (prop.$ref) {
    const refSchema = ajv.getSchema(prop.$ref)?.schema;
    if (!refSchema) return "any";

    // For top-level type references, preserve the object structure
    if (refSchema.type === "object" || refSchema.properties) {
      const props = Object.entries(refSchema.properties || {})
        .map(([key, value]) => {
          const type = getTypeFromSchema(value, ajv);
          const required = refSchema.required?.includes(key);
          return `${key}${required ? "" : "?"}: ${type}`;
        })
        .join(", ");
      return `{${props}}`;
    }

    return getTypeFromSchema(refSchema, ajv);
  }
  return getTypeFromSchema(prop, ajv);
}

function getTypeFromSchema(schema, ajv) {
  if (schema.type === "array") {
    return `${getPropertyType(schema.items, ajv)}[]`;
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
    return formatObjectType(schema, ajv);
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
  const formattedTypes = types
    .filter((t) => t !== "null")
    .map((t) => (t === "integer" ? "number" : t));
  return formattedTypes.length === 1
    ? formattedTypes[0]
    : `(${formattedTypes.join("|")})`;
}

function formatObjectType(schema, ajv) {
  const props = Object.entries(schema.properties || {})
    .map(([key, value]) => {
      const type = getPropertyType(value, ajv);
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
