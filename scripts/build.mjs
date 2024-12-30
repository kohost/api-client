import * as esbuild from "esbuild";
// eslint-disable-next-line
import useCases from "../src/useCases/http.json" assert { type: "json" };
import { GenerateIndexPlugin } from "./generate-index.mjs";
import { GenerateModelPlugin } from "./generate-models.mjs";
import { GenerateUseCases } from "./generate-useCases.mjs";
import { GenerateValidatorPlugin } from "./generate-validators.mjs";

const formats = ["esm", "cjs"];

const target = "esnext";

function outExtension(format) {
  return {
    ".js": format === "esm" ? ".js" : ".js",
  };
}

const builds = formats.map((format) => {
  esbuild.build({
    entryPoints: ["src/models/entity.js"],
    bundle: true,
    platform: "node",
    target,
    outdir: `dist/${format}/models`,
    outExtension: outExtension(format),
    keepNames: true,
    format,
  });

  esbuild.build({
    entryPoints: ["src/schemas/*.js"],
    bundle: false,
    platform: "node",
    target,
    plugins: [
      GenerateIndexPlugin({ excludeFiles: ["definitions.js"] }),
      GenerateModelPlugin({ excludeFiles: ["definitions.js"] }),
    ],
    outdir: `dist/${format}/models`,
    outExtension: outExtension(format),
    keepNames: true,
    format,
  });

  esbuild.build({
    entryPoints: ["src/schemas/*.js"],
    bundle: false,
    platform: "node",
    target,
    plugins: [
      GenerateIndexPlugin({ excludeFiles: ["definitions.js"] }),
      GenerateValidatorPlugin({ excludeFiles: ["definitions.js"] }),
    ],
    outdir: `dist/${format}/validators`,
    outExtension: outExtension(format),
    keepNames: true,
    format,
  });

  esbuild.build({
    entryPoints: ["src/commands/*.js"],
    bundle: false,
    platform: "node",
    target,
    plugins: [GenerateIndexPlugin()],
    outdir: `dist/${format}/commands`,
    outExtension: outExtension(format),
    keepNames: true,
    format,
  });

  esbuild.build({
    entryPoints: ["src/errors/*.js"],
    bundle: false,
    platform: "node",
    target,
    plugins: [GenerateIndexPlugin()],
    outdir: `dist/${format}/errors`,
    outExtension: outExtension(format),
    keepNames: true,
    format,
  });

  esbuild.build({
    entryPoints: ["src/events/*.js"],
    bundle: false,
    platform: "node",
    target,
    plugins: [GenerateIndexPlugin()],
    outdir: `dist/${format}/events`,
    outExtension: outExtension(format),
    keepNames: true,
    format,
  });

  esbuild.build({
    entryPoints: ["src/*.js"],
    plugins: [GenerateUseCases(new Map(useCases))],
    bundle: false,
    platform: "node",
    target,
    outdir: `dist/${format}`,
    keepNames: true,
    outExtension: outExtension(format),
    format,
  });
});

Promise.all(builds);
