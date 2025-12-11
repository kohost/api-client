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
  // minify: "terser",
  // terserOptions: {
  //   mangle: false,
  //   keep_fnames: true,
  //   keep_classnames: true,
  // },
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
  // minify: "terser",
  // terserOptions: {
  //   mangle: false,
  //   keep_fnames: true,
  //   keep_classnames: true,
  // },
};

export default defineConfig([
  // ESM build - all source files from .generated
  {
    ...esmConfig,
    entry: [
      ".generated/index.ts",
      ".generated/events/*",
      ".generated/errors/*",
      ".generated/commands/*",
      ".generated/models/*",
      ".generated/useCases/*",
      ".generated/schemas/*",
      ".generated/httpClient.js",
      ".generated/amqpClient.js",
      ".generated/validate.ts",
    ],
    outDir: "dist/esm",
    esbuildOptions(options) {
      options.outbase = ".generated";
      return options;
    },
    clean: true,
  },
  // CJS build - all source files from .generated
  {
    ...cjsConfig,
    entry: [
      ".generated/index.ts",
      ".generated/events/*",
      ".generated/errors/*",
      ".generated/commands/*",
      ".generated/models/*",
      ".generated/useCases/*",
      ".generated/schemas/*",
      ".generated/httpClient.js",
      ".generated/amqpClient.js",
      ".generated/validate.ts",
    ],
    outDir: "dist/cjs",
    esbuildOptions(options) {
      options.outbase = ".generated";
      return options;
    },
    clean: true,
  },
]);
