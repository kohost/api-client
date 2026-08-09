import type { Ajv } from "ajv";

export interface LowerBoundTableParams {
  key: string;
}

/**
 * Registers the `lowerBoundTable` keyword: on an array of objects,
 * `lowerBoundTable: { key: "minAmount" }` enforces that the first row's key is
 * 0 and keys strictly ascend, so a table of lower-bound rows can have no gaps
 * or overlaps by construction. An empty array is valid (no table configured).
 */
export function addLowerBoundTableKeyword(ajv: Ajv): Ajv {
  return ajv.addKeyword({
    keyword: "lowerBoundTable",
    type: "array",
    schemaType: "object",
    validate(params: LowerBoundTableParams, rows: unknown[]) {
      let previous: number | undefined;
      for (const row of rows) {
        const value =
          typeof row === "object" && row !== null
            ? (row as Record<string, unknown>)[params.key]
            : undefined;
        if (typeof value !== "number") return false;
        if (previous === undefined ? value !== 0 : value <= previous) {
          return false;
        }
        previous = value;
      }
      return true;
    },
  });
}
