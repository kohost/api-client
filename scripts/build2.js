import * as esbuild from "esbuild";
import useCases from "../src/useCases/http.json" assert { type: "json" };
import { GenerateIndexPlugin } from "./generate-index.js";
import { GenerateModelPlugin } from "./generate-models.js";
import { GenerateUseCases } from "./generate-useCases.js";
import { GenerateValidatorPlugin } from "./generate-validators.js";

const formats = ["esm", "cjs"];

const target = "node20";

const builds = formats.map((format) => {
  esbuild.build({
    entryPoints: ["src/Models/Entity.js"],
    bundle: true,
    platform: "node",
    target,
    outfile: `dist/${format}/Models/Entity.js`,
    keepNames: true,
    format,
  });

  esbuild.build({
    entryPoints: ["src/schemas/*.js"],
    bundle: false,
    platform: "node",
    target,
    plugins: [GenerateModelPlugin({ excludeFiles: ["definitions.js"] })],
    outdir: `dist/${format}/Models`,
    keepNames: true,
    format,
  });

  esbuild.build({
    entryPoints: ["src/schemas/*.js"],
    bundle: false,
    platform: "node",
    target,
    plugins: [GenerateValidatorPlugin({ excludeFiles: ["definitions.js"] })],
    outdir: `dist/${format}/Validators`,
    keepNames: true,
    format,
  });

  esbuild.build({
    entryPoints: ["src/Commands/*.js"],
    bundle: false,
    platform: "node",
    target,
    plugins: [GenerateIndexPlugin()],
    outdir: `dist/${format}/Commands`,
    keepNames: true,
    format,
  });

  esbuild.build({
    entryPoints: ["src/Errors/*.js"],
    bundle: false,
    platform: "node",
    target,
    plugins: [GenerateIndexPlugin()],
    outdir: `dist/${format}/Errors`,
    keepNames: true,
    format,
  });

  esbuild.build({
    entryPoints: ["src/Events/*.js"],
    bundle: false,
    platform: "node",
    target,
    plugins: [GenerateIndexPlugin()],
    outdir: `dist/${format}/Events`,
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
