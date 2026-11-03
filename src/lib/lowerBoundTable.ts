import { _, type Ajv, type KeywordCxt } from "ajv";

export interface LowerBoundTableParams {
  key: string;
}

/**
 * Registers the `lowerBoundTable` keyword: on an array of objects,
 * `lowerBoundTable: { key: "minAmount" }` enforces that the first row's key is
 * 0 and keys strictly ascend, so a table of lower-bound rows can have no gaps
 * or overlaps by construction. An empty array is valid (no table configured).
 *
 * Defined with `code` rather than `validate` so standalone validators can
 * emit it: AJV can't serialize a `validate` function into generated source.
 */
export function addLowerBoundTableKeyword(ajv: Ajv): Ajv {
  return ajv.addKeyword({
    keyword: "lowerBoundTable",
    type: "array",
    schemaType: "object",
    code(cxt: KeywordCxt) {
      const { gen, data } = cxt;
      const { key } = cxt.schema as LowerBoundTableParams;
      const valid = gen.let("valid", true);
      const previous = gen.let("previous");
      gen.forOf("row", data, (row) => {
        const value = gen.const(
          "value",
          _`typeof ${row} == "object" && ${row} !== null ? ${row}[${key}] : undefined`,
        );
        gen.if(
          _`typeof ${value} != "number" || (${previous} === undefined ? ${value} !== 0 : ${value} <= ${previous})`,
          () => gen.assign(valid, false).break(),
        );
        gen.assign(previous, value);
      });
      cxt.pass(valid);
    },
  });
}
