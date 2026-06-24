import { defineConfig } from "tsdown";

export default defineConfig({
  format: ["esm"],
  dts: false,
  unbundle: true,
  sourcemap: true,
  target: "es2022",
  platform: "node",
  outExtensions: () => ({ js: ".js" }),
  entry: [
    ".generated/index.ts",
    ".generated/events/*",
    ".generated/errors/*",
    ".generated/commands/*",
    ".generated/lib/*",
    ".generated/models/*",
    ".generated/useCases/*",
    ".generated/schemas/*",
    ".generated/httpClient.js",
    ".generated/validate.ts",
  ],
  outDir: "dist",
  clean: process.env.BUILD_CLEAN !== "false",
});
