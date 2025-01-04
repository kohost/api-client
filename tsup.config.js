import { defineConfig } from "tsup";

export default defineConfig([
  // browser build
  {
    entry: ["src/index-browser.js"],
    outDir: "dist",
    format: ["esm"],
    dts: true,
    clean: true,
    sourcemap: true,
    bundle: true,
    target: "es2022",
    platform: "browser",
    treeshake: true, // Enable tree shaking
    splitting: true, // Enable code splitting
    globalName: "kohost",
  },
  // node build
  {
    entry: ["src/index.js"],
    outDir: "dist",
    format: ["cjs", "esm"],
    dts: true,
    clean: false,
    sourcemap: true,
    target: "node20",
    platform: "node",
    globalName: "kohost",
  },
]);
