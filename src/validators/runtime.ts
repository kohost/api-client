import type { ErrorObject } from "ajv";
import * as equalModule from "ajv/dist/runtime/equal.js";
import * as ucs2lengthModule from "ajv/dist/runtime/ucs2length.js";

import { fullFormats } from "ajv-formats/dist/formats.js";

export interface Validator {
  (data: unknown): boolean;
  errors?: ErrorObject[] | null;
}

// AJV's runtime helpers are CommonJS with `exports.default`. Node hands an
// ES importer `module.exports` as `default`; bundlers honour `__esModule` and
// hand over `exports.default` itself. Unwrapping covers both.
function unwrap<T>(namespace: { default: unknown }): T {
  const value = namespace.default as { default?: T } & T;
  return value.default ?? value;
}

export const equal =
  /* @__PURE__ */ unwrap<(a: unknown, b: unknown) => boolean>(equalModule);
export const ucs2length =
  /* @__PURE__ */ unwrap<(str: string) => number>(ucs2lengthModule);

export function format(name: string) {
  return fullFormats[name as keyof typeof fullFormats];
}
