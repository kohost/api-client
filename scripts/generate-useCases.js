import fs from "node:fs";

/**
 * Generates use case methods for the KohostApiClient.
 *
 * @param {Map<string, Object>} useCases - A map of use case names to their configurations.
 * @returns {Object} An object containing the name of the plugin and the setup function.
 *
 * @example
 * const useCases = new Map();
 * useCases.set('getUser', {
 *   http: {
 *     method: 'GET',
 *     path: '/users/:id'
 *   }
 * });
 *
 * const plugin = GenerateUseCases(useCases);
 *
 * // In your build setup
 * esbuild.build({
 *   plugins: [plugin],
 *   ...
 * });
 */
export const GenerateUseCases = (useCases) => ({
  name: "generate-useCases",
  async setup(build) {
    build.onLoad({ filter: /httpClient\.js$/ }, async (args) => {
      const fileText = await fs.promises.readFile(args.path, "utf-8");

      // create a require statement for each use case
      const useCaseImportStatements = [];
      // attached each method to the UseCase class
      const useCaseClassMethods = [];

      for (const [useCase, data] of useCases.entries()) {
        if (data.http) {
          useCaseImportStatements.push(
            `import ${useCase} from "./useCases/${useCase}"`
          );

          useCaseClassMethods.push(
            `KohostApiClient.prototype.${useCase} = ${useCase};`
          );
        }
      }

      // add the require statements to the top of the file
      let file = fileText.replace(
        "/* Add Use Cases Here */",
        useCaseImportStatements.join("\n")
      );

      // add the use case methods to the class
      file = file.replace(
        "/* Add Use Case Methods Here */",
        useCaseClassMethods.join("\n")
      );

      return {
        contents: file,
        loader: "js",
      };
    });
  },
});
