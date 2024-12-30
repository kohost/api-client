/**
 * GenerateModelPlugin is a plugin for generating model validators and classes
 * based on JSON schemas. It uses AJV (Another JSON Schema Validator) to compile
 * and validate schemas, and generates corresponding JavaScript classes and
 * validation functions.
 *
 * @param {Object} options - The options for the plugin.
 * @param {string[]} [options.excludeFiles=[]] - An array of file paths to exclude from processing.
 * @returns {Object} The plugin object with a name and setup function.
 *
 * @property {string} name - The name of the plugin.
 * @property {Function} setup - The setup function for the plugin, which registers build hooks.
 *
 * @example
 * const plugin = GenerateModelPlugin({ format: "esm", excludeFiles: ["example.js"] });
 * esbuild.build({
 *   entryPoints: ["src/index.js"],
 *   bundle: true,
 *   plugins: [plugin],
 * }).catch(() => process.exit(1));
 */

export const GenerateModelPlugin = ({ excludeFiles = [] }) => ({
  name: "generate-models",
  async setup(build) {
    build.onLoad({ filter: /\.js$/ }, async (args) => {
      if (excludeFiles.some((file) => args.path.endsWith(file))) return;

      const { default: schema, methods = {} } = await import(args.path);
      const schemaTitle = schema.title.replace(/\s+/g, "");
      // schema filename has the first letter lowercase
      const fileName =
        schemaTitle.charAt(0).toLowerCase() + schemaTitle.slice(1);

      const entityImport = "import { Entity } from './entity';";

      const validatorImport = `import { validate } from '../validators/${fileName}';`;

      const code = `
        ${entityImport}
        ${validatorImport}
 
        export class ${schemaTitle} extends Entity {
          constructor(data) {
            super(data);
            ${Object.keys(schema.properties)
              .map((prop) => `this.${prop} = data.${prop};`)
              .join("\n            ")}
          }

            ${Object.entries(methods)
              .map(
                ([name, func]) =>
                  `${name}${func.toString().slice(func.toString().indexOf("("))}`
              )
              .join("\n    ")}
        }
 
        Object.defineProperty(${schemaTitle}.prototype, "schema", {
          value: ${JSON.stringify(schema)}
        });
 
        Object.defineProperty(${schemaTitle}.prototype, "validator", {
          get: function() { return validate; }
        });
      `;

      return { contents: code, loader: "js" };
    });
  },
});
