import { defineConfig } from "tsup";

// Shared config for ESM builds
const esmConfig = {
  format: ["esm"],
  dts: true,
  bundle: true,
  sourcemap: true,
  target: ["es2022"],
  platform: "node",
  keepNames: true,
  minify: "terser",
  terserOptions: {
    mangle: false,
    keep_fnames: true,
    keep_classnames: true,
  },
};

// Shared config for CJS builds
const cjsConfig = {
  format: ["cjs"],
  dts: true,
  bundle: true,
  sourcemap: true,
  target: ["es2022"],
  platform: "node",
  keepNames: true,
  minify: "terser",
  terserOptions: {
    mangle: false,
    keep_fnames: true,
    keep_classnames: true,
  },
};

export default defineConfig([
  // ESM build - source files
  {
    ...esmConfig,
    entry: [
      "src/index.js",
      "src/events/*",
      "src/errors/*",
      "src/commands/*",
      "src/defs.js",
      "src/utils.js",
      "src/httpClient.js",
      "src/amqpClient.js",
    ],
    outDir: "dist/esm",
    esbuildOptions(options) {
      options.outbase = "src";
      return options;
    },
    clean: true,
  },
  // CJS build - source files
  {
    ...cjsConfig,
    entry: [
      "src/index.js",
      "src/events/*",
      "src/errors/*",
      "src/commands/*",
      "src/defs.js",
      "src/utils.js",
      "src/httpClient.js",
      "src/amqpClient.js",
    ],
    outDir: "dist/cjs",
    esbuildOptions(options) {
      options.outbase = "src";
      return options;
    },
    clean: true,
  },
  // ESM build - generated models and useCases
  {
    ...esmConfig,
    entry: [
      ".generated/models/*",
      ".generated/useCases/*",
      ".generated/validate.ts",
    ],
    outDir: "dist/esm",
    esbuildOptions(options) {
      options.outbase = ".generated";
      return options;
    },
    clean: false,
  },
  // CJS build - generated models and useCases
  {
    ...cjsConfig,
    entry: [
      ".generated/models/*",
      ".generated/useCases/*",
      ".generated/validate.ts",
    ],
    outDir: "dist/cjs",
    esbuildOptions(options) {
      options.outbase = ".generated";
      return options;
    },
    clean: false,
  },
  // Schemas - ESM only (for direct imports)
  {
    entry: ["src/schemas/*"],
    outDir: "dist/esm/schemas",
    format: ["esm"],
    dts: false,
    bundle: false,
    clean: false,
    sourcemap: true,
    target: ["es2022"],
    platform: "node",
  },
]);
