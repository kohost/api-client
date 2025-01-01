import { Ajv } from "ajv";
import addFormats from "ajv-formats";
import standaloneCode from "ajv/dist/standalone/index.js";
import { glob } from "glob";
import path from "node:path";

export const GenerateValidatorPlugin = ({ excludeFiles = [] }) => ({
  name: "generate-validator",
  async setup(build) {
    const format = build.initialOptions.format;

    const schemas = (await importFiles(build.initialOptions.entryPoints)).map(
      (module) => module.default
    );

    const ajv = new Ajv({
      allErrors: true,
      useDefaults: true,
      strict: false,
      allowMatchingProperties: true,
      allowUnionTypes: true,
      strictRequired: false,
      schemas: schemas,
      code: {
        source: true,
        es5: false,
        esm: format === "esm",
        lines: true,
      },
    });

    addFormats(ajv);

    build.onLoad({ filter: /\.mjs$/ }, async (args) => {
      if (excludeFiles.some((file) => args.path.endsWith(file))) return;

      const { default: schema } = await import(args.path);
      const moduleCode = standaloneCode(ajv, { validate: schema.$id });

      const importStatement = `import { createRequire } from 'node:module'; 
      const require = createRequire(import.meta.url);`;

      return {
        // contents:
        //   format === "esm" ? `${importStatement}\n${moduleCode}` : moduleCode,
        contents: moduleCode,
        loader: "js",
      };
    });
  },
});

function importFiles(patterns) {
  const files = [];
  for (const pattern of patterns) {
    const absolutePattern = path.resolve(process.cwd(), pattern);
    const matches = glob.sync(absolutePattern);
    files.push(...matches.map(async (file) => import(file)));
  }
  return Promise.all(files);
}