import { nodeModulesPolyfillPlugin } from "esbuild-plugins-node-modules-polyfill";
import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.js"],
  outDir: "dist",
  format: ["cjs", "esm"],
  dts: true,
  clean: true,
  sourcemap: true,
  target: "node20",
  esbuildPlugins: [nodeModulesPolyfillPlugin({ globals: { Buffer: true } })],
});
