import { defineConfig } from "tsup";
import { readFileSync, writeFileSync, readdirSync, statSync } from "fs";
import { join } from "path";

// Post-process ESM files to add .js extensions to relative imports
function addJsExtensions(dir) {
  const files = readdirSync(dir);
  for (const file of files) {
    const filePath = join(dir, file);
    const stat = statSync(filePath);
    if (stat.isDirectory()) {
      addJsExtensions(filePath);
    } else if (file.endsWith(".js")) {
      let content = readFileSync(filePath, "utf8");
      // Match relative imports without .js extension
      content = content.replace(
        /(from\s+["'])(\.\.?\/[^"']+)(["'])/g,
        (match, prefix, path, suffix) => {
          if (!path.endsWith(".js")) {
            return `${prefix}${path}.js${suffix}`;
          }
          return match;
        },
      );
      writeFileSync(filePath, content);
    }
  }
}

export default defineConfig({
  format: ["esm"],
  dts: true,
  bundle: false,
  splitting: false,
  sourcemap: true,
  target: ["es2022"],
  platform: "node",
  keepNames: true,
  entry: [
    ".generated/index.ts",
    ".generated/events/*",
    ".generated/errors/*",
    ".generated/commands/*",
    ".generated/models/*",
    ".generated/useCases/*",
    ".generated/schemas/*",
    ".generated/httpClient.js",
    ".generated/validate.ts",
  ],
  outDir: "dist",
  esbuildOptions(options) {
    options.outbase = ".generated";
    return options;
  },
  onSuccess: async () => {
    addJsExtensions("dist");
  },
  clean: true,
});
