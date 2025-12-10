import { defineConfig } from "tsup";

export default defineConfig([
  // Main build - source files
  {
    entry: [
      "src/index.js",
      "src/events/*",
      "src/errors/*",
      "src/commands/*",
      "src/defs.js",
      "src/utils.js",
      "src/httpClient.js",
      "src/socketIoClient.js",
      "src/amqpClient.js",
    ],
    outDir: "dist",
    esbuildOptions(options) {
      options.outbase = "src";
      return options;
    },
    minify: "terser",
    terserOptions: {
      mangle: false,
      keep_fnames: true,
      keep_classnames: true,
    },
    format: ["cjs", "esm"],
    dts: true,
    bundle: true,
    clean: true,
    sourcemap: true,
    target: ["es2022"],
    platform: "node",
    globalName: "kohost",
    keepNames: true,
  },
  // Generated models and useCases from .generated/
  {
    entry: [
      ".generated/models/*",
      ".generated/useCases/*",
      ".generated/validate.ts",
    ],
    outDir: "dist",
    esbuildOptions(options) {
      options.outbase = ".generated";
      return options;
    },
    minify: "terser",
    terserOptions: {
      mangle: false,
      keep_fnames: true,
      keep_classnames: true,
    },
    format: ["cjs", "esm"],
    dts: true,
    bundle: true,
    clean: false,
    sourcemap: true,
    target: ["es2022"],
    platform: "node",
    globalName: "kohost",
    keepNames: true,
  },
  // Schemas - copy as-is for direct imports
  {
    entry: ["src/schemas/*"],
    outDir: "dist/schemas",
    format: ["esm"],
    dts: false,
    bundle: false,
    clean: false,
    sourcemap: true,
    target: ["es2022"],
    platform: "node",
  },
]);
