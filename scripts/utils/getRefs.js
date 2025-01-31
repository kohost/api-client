/**
 * Recursively finds all schema dependencies for a given schema
 * @param {Object} targetSchema - The schema to analyze
 * @param {Object} allSchemas - Map/object of all available schemas, keyed by filename
 * @returns {string[]} Array of unique schema filenames representing dependencies
 */
export function getExternalRefs(targetSchema, allSchemas) {
  const fileNames = new Set();
  const visited = new Set();

  // Create a map of filename to schema for easier lookup
  const schemaMap = new Map(
    allSchemas.map((schema) => [schema.$id || "", schema])
  );

  /**
   * Extracts the filename from a $ref value
   * @param {string} ref - The $ref value
   * @returns {string} The filename portion of the ref
   */
  function getFileName(ref) {
    return ref.split("#")[0];
  }

  /**
   * Checks if a $ref value points to an external file
   * @param {string} ref - The $ref value to check
   * @returns {boolean} True if the ref is external
   */
  function isExternalRef(ref) {
    return ref && !ref.startsWith("#") && ref.includes(".json");
  }

  /**
   * Recursively processes a schema and its dependencies
   * @param {Object} schema - Schema to process
   */
  function processSchema(schema) {
    // Skip if we've already processed this schema
    const schemaId = schema.$id || JSON.stringify(schema);
    if (visited.has(schemaId)) {
      return;
    }
    visited.add(schemaId);

    /**
     * Traverses an object to find all external $ref values
     * @param {Object} obj - The object to traverse
     */
    function traverse(obj) {
      if (!obj || typeof obj !== "object") {
        return;
      }

      if (Array.isArray(obj)) {
        obj.forEach((item) => traverse(item));
        return;
      }

      for (const [key, value] of Object.entries(obj)) {
        if (
          key === "$ref" &&
          typeof value === "string" &&
          isExternalRef(value)
        ) {
          const fileName = getFileName(value);
          fileNames.add(fileName);

          // Process the referenced schema if available
          const referencedSchema = schemaMap.get(fileName);
          if (referencedSchema) {
            processSchema(referencedSchema);
          }
        } else if (typeof value === "object") {
          traverse(value);
        }
      }
    }

    traverse(schema);
  }

  processSchema(targetSchema);
  return Array.from(fileNames);
}
