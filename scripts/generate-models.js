// build-plugin.js
const fs = require("node:fs");
const path = require("node:path");
const { Ajv } = require("ajv");
const addFormats = require("ajv-formats");
const standaloneCode = require("ajv/dist/standalone");

/**
 *
 * @param {"esm" | "cjs"} format
 * @returns
 */
const build = (format) => ({
  name: "generate-models",
  setup(build) {
    const schemaDir = path.resolve("./src/schemas");
    const schemas = fs
      .readdirSync(schemaDir)
      .filter((file) => file.endsWith(".js"))
      .map((file) => require(path.join(schemaDir, file)));

    const ajv = new Ajv({
      allErrors: true,
      useDefaults: true,
      strict: false,
      allowMatchingProperties: true,
      allowUnionTypes: true,
      strictRequired: false,
      schemas: schemas,
      code: { source: true, es5: false, esm: format === "esm", lines: true },
    });

    addFormats(ajv);

    build.onLoad({ filter: /\.js$/ }, async (args) => {
      if (args.path.endsWith("definitions.js")) return;

      const schema = require(args.path);
      const validate = ajv.getSchema(schema.$id);
      const moduleCode = standaloneCode(ajv, validate);
      const schemaTitle = schema.title.replace(/\s+/g, "");

      const validatorDir = path.resolve(`./dist/${format}/validators`);
      await fs.promises.mkdir(validatorDir, { recursive: true });
      await fs.promises.writeFile(
        path.join(validatorDir, `validate${schemaTitle}.js`),
        moduleCode
      );

      const entityImport = "import Entity from './entity';";

      const validatorImport = `import validate from '../validators/validate${schemaTitle}.js';`;

      const moduleExport = `export default ${schemaTitle}`;

      const code = `
        ${entityImport}
        ${validatorImport}
 
        class ${schemaTitle} extends Entity {
          constructor(data) {
            super(data);
            ${Object.keys(schema.properties)
    .map((prop) => `this.${prop} = data.${prop};`)
    .join("\n            ")}
          }
        }
 
        Object.defineProperty(${schemaTitle}.prototype, "schema", {
          value: ${JSON.stringify(schema)}
        });
 
        Object.defineProperty(${schemaTitle}.prototype, "validator", {
          get: function() { return validate; }
        });
 
        ${moduleExport}
      `;

      return { contents: code, loader: "js" };
    });
  },
});

module.exports = build;
