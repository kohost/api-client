import { defineConfig } from "tsup";

export default defineConfig([
  // browser build
  // {
  //   entry: {
  //     client: "src/httpClient.js",
  //     socketIoClient: "src/socketIoClient.js",
  //     utils: "src/utils.js",
  //     defs: "src/defs.js",
  //     models: "src/models/index.js",
  //     events: "src/events/index.js",
  //     errors: "src/errors/index.js",
  //     commands: "src/commands/index.js",
  //     useCases: "src/useCases/index.js",
  //   },
  //   outDir: "dist",
  //   format: ["esm", "cjs"],
  //   dts: true,
  //   clean: false,
  //   sourcemap: true,
  //   bundle: true,
  //   target: "es2022",
  //   platform: "neutral",
  //   globalName: "kohost",
  //   minify: "terser",
  //   terserOptions: {
  //     mangle: false,
  //     keep_fnames: true,
  //     keep_classnames: true,
  //   },
  // },
  // //node build
  // {
  //   entry: ["src/index.js"],
  //   outDir: "dist",
  //   format: ["cjs", "esm"],
  //   dts: true,
  //   clean: false,
  //   sourcemap: true,
  //   target: "node20",
  //   platform: "node",
  //   globalName: "kohost",
  //   keepNames: true,
  // },
  {
    entry: [
      "src/index.js",
      "src/models/*",
      "src/useCases/*",
      "src/events/*",
      "src/errors/*",
      "src/commands/*",
      "src/defs.js",
      "src/utils.js",
      "src/httpClient.js",
      "src/socketIoClient.js",
      "src/amqpClient.js",
      "src/validators.js",
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
]);
