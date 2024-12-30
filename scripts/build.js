import * as esbuild from "esbuild";
// eslint-disable-next-line
import useCases from "../src/useCases/http.json" assert { type: "json" };
import { GenerateIndexPlugin } from "./generate-index.js";
import { GenerateModelPlugin } from "./generate-models.js";
import { GenerateUseCases } from "./generate-useCases.js";
import { GenerateValidatorPlugin } from "./generate-validators.js";

const formats = ["esm", "cjs"];

const target = "esnext";

const builds = formats.map((format) => {
  esbuild.build({
    entryPoints: ["src/models/entity.js"],
    bundle: true,
    platform: "node",
    target,
    outfile: `dist/${format}/models/entity.js`,
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
    format,
  });
});

Promise.all(builds);
