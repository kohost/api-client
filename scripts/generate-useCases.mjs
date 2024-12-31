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
    const options = build.initialOptions;
    const outDir = options.outdir;
    const esbuild = build.esbuild;

    build.onLoad({ filter: /httpClient\.mjs$/ }, async (args) => {
      const fileText = await fs.promises.readFile(args.path, "utf-8");

      // create a require statement for each use case
      const useCaseImportStatements = [];
      // attached each method to the UseCase class
      const useCaseClassMethods = [];
      const indexExports = [];

      for (const [useCase, data] of useCases.entries()) {
        if (data.http) {
          //lowercase first letter
          const useCaseFileName =
            useCase.charAt(0).toLowerCase() + useCase.slice(1);

          indexExports.push(useCaseFileName);

          useCaseImportStatements.push(
            `import { ${useCase} } from "./useCases/${useCaseFileName}"`
          );

          useCaseClassMethods.push(
            `KohostHTTPClient.prototype.${useCase} = ${useCase};`
          );

          const code = generateUseCaseCode(useCase, data.http);
          const bundle = await esbuild.transform(code, {
            loader: "js",
            format: "esm",
            target: options.target,
            keepNames: true,
          });

          // take the code and write it to a file using esbuild
          await esbuild.build({
            stdin: {
              contents: bundle.code,
              loader: "js",
            },
            write: true,
            outfile: `${outDir}/useCases/${useCaseFileName}.js`,
            format: options.format,
          });
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

      const index = generateUseCaseIndex(indexExports);

      const indexBundle = await esbuild.transform(index, {
        loader: "js",
        format: "esm",
        target: options.target,
        keepNames: true,
      });

      await esbuild.build({
        stdin: {
          contents: indexBundle.code,
          loader: "js",
        },
        write: true,
        outfile: `${outDir}/useCases/index.js`,
        format: options.format,
      });

      return {
        contents: file,
        loader: "js",
      };
    });
  },
});

function generateUseCaseIndex(useCases) {
  return `
    ${useCases.map((useCase) => `export * from "./${useCase.charAt(0).toLowerCase() + useCase.slice(1)}"`).join("\n")}
  `;
}

function generateUseCaseCode(useCase, { method, path: endpoint }) {
  const pathParams = endpoint.match(/:[a-zA-Z0-9]+/g);

  let code = `
        
            /* 
              Creates a method for each use case in the API
              @memberof KohostApiClient
              @param {Object} requestData - The options to send to the API
              @param {Object} requestData.headers - The headers to send to the API
              @param {Object} requestData.data - The body to send to the API. Valid for POST and PUT requests
              @parms {Object} requestData.query - The query for the request to build the URL
              @returns {Promise} The response from the API
            */
            
            //eslint-disable-next-line no-inner-declarations
            export function ${useCase}(requestData = {data: null, query: null, headers: null}, httpConfigOptions = {}) {

            if (!requestData) requestData = {};
            
            // get parameters from path
            const pathParams = ${JSON.stringify(pathParams)}
            
            const { data, query, headers } = requestData;
            
            // replace path parameters with values from params
            let url = "${endpoint}";
            if (pathParams && data) {
              for (const param of pathParams) {
              const paramName = param.replace(":", "");
              url = url.replace(param, data[paramName]);
              }
            }
            
            // make sure all parameters have been replaced
            if (url.match(/:[a-zA-Z0-9]+/g)) {
              const missingParams = url.match(/:[a-zA-Z0-9]+/g);
              // remove the colon from the parameter name
              const missing = missingParams.map((param) => param.replace(":", ""));
              return Promise.reject(
              new Error("Missing parameters: " + missing.join(", "))
              );
            }
            
            const config = {
              method: "${method.toLowerCase()}",
              url: url,
              ...httpConfigOptions,
            };
            
            if (data) config.data = data;
            if (query) config.params = query;
            if (headers) config.headers = headers;
            
            return this._http.request(config);
            }`;

  return code;
}
