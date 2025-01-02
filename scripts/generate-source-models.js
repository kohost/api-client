import { Ajv } from "ajv";
import addFormats from "ajv-formats";
import standaloneCode from "ajv/dist/standalone/index.js";
import fs from "node:fs";

const banner =
  "// This file is automatically generated. Do not modify it manually.";

const useCaseJson = fs.readFileSync("src/useCases.json", { encoding: "utf-8" });
const useCases = new Map(JSON.parse(useCaseJson));

// load all files in the src/schemas directory
const schemaFiles = fs.readdirSync("src/schemas");
// import all files in the src/schemas directory
const schemaModules = schemaFiles
  .filter((filename) => filename.endsWith("js"))
  .map((file) => import(`../src/schemas/${file}`));

Promise.all(schemaModules).then((modules) => {
  const schemas = modules.map((module) => module.default);

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
      esm: true,
      lines: true,
    },
  });

  addFormats(ajv);

  const modelIndexExports = ["entity"];
  const validatorIndexExports = [];
  const useCaseIndexExports = [];

  const validateMap = schemas.reduce((acc, schema) => {
    if (schema.$id === "definitions.json") return acc;
    const schemaTitle = schema.title.replace(/\s+/g, "");
    acc[`validate${schemaTitle}`] = schema.$id;
    return acc;
  }, {});

  const validatorCode = standaloneCode(ajv, validateMap);
  fs.writeFileSync("src/validators/validate.js", validatorCode);

  for (const module of modules) {
    const schema = module.default;
    if (schema.$id === "definitions.json") continue;
    const schemaTitle = schema.title.replace(/\s+/g, "");
    const fileName = schemaTitle.charAt(0).toLowerCase() + schemaTitle.slice(1);
    modelIndexExports.push(fileName);
    validatorIndexExports.push(fileName);
    const validatorCode = generateValidatorCode(ajv, module);
    const modelCode = generateModelCode(module);
    fs.writeFileSync(`src/models/${fileName}.js`, modelCode);
  }

  for (const [useCase, data] of useCases.entries()) {
    if (data.http) {
      const useCaseFileName =
        useCase.charAt(0).toLowerCase() + useCase.slice(1);
      useCaseIndexExports.push(useCaseFileName);
      const code = generateUseCaseCode(useCase, data.http);
      fs.writeFileSync(`src/useCases/${useCaseFileName}.js`, code);
    }
  }

  const useCaseIndexCode = generateIndexCode(useCaseIndexExports);
  const modelIndexCode = generateIndexCode(modelIndexExports);
  const validatorIndexCode = generateIndexCode(validatorIndexExports);

  fs.writeFileSync("src/useCases/index.js", useCaseIndexCode);
  fs.writeFileSync("src/models/index.js", modelIndexCode);
  fs.writeFileSync("src/validators/index.js", validatorIndexCode);
});

function generateValidatorCode(ajv, schemaModule) {
  const schema = schemaModule.default;
  const schemaTitle = schema.title.replace(/\s+/g, "");

  const importStatement = `${banner}\n
	  import { createRequire } from 'node:module'; 
	  const require = createRequire(import.meta.url);`;

  const validatorCode = standaloneCode(ajv, {
    [`validate${schemaTitle}`]: schema.$id,
  });
  const validatorModuleCode = `${importStatement}\n${validatorCode}`;

  return validatorModuleCode;
}

function generateModelCode(schemaModule) {
  const {
    default: schema,
    methods = {},
    statics = {},
    getters = {},
    setters = {},
  } = schemaModule;

  const schemaTitle = schema.title.replace(/\s+/g, "");
  const fileName = schemaTitle.charAt(0).toLowerCase() + schemaTitle.slice(1);

  const entityImport = "import { Entity } from './entity';";

  const validatorImport = `import { validate${schemaTitle} as validate } from '../validators/${fileName}';`;

  const code = `${banner}\n
  ${entityImport}
  ${validatorImport}

  export class ${schemaTitle} extends Entity {
	constructor(data) {
	  super(data);
	  ${Object.keys(schema.properties)
      .map((prop) => `this.${prop} = data.${prop};`)
      .join("\n            ")}
	}
	  

	${Object.entries(statics)
    .map(
      ([name, func]) =>
        `static ${name}${func.toString().slice(func.toString().indexOf("("))}`
    )
    .join("\n    ")}
	  
	  ${Object.entries(methods)
      .map(
        ([name, func]) =>
          `${name}${func.toString().slice(func.toString().indexOf("("))}`
      )
      .join("\n    ")}

	  ${Object.entries(getters)
      .map(
        ([name, func]) =>
          `get ${name}${func.toString().slice(func.toString().indexOf("("))}`
      )
      .join("\n    ")}

	  ${Object.entries(setters)
      .map(
        ([name, func]) =>
          `set ${name}${func.toString().slice(func.toString().indexOf("("))}`
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

  return code;
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

function generateIndexCode(files) {
  return `
	  ${files.map((useCase) => `export * from "./${useCase.charAt(0).toLowerCase() + useCase.slice(1)}";`).join("\n")}
	`;
}
