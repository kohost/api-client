/* eslint-disable */
import { Ajv } from "ajv";
import addFormats from "ajv-formats";
import standaloneCode from "ajv/dist/standalone/index.js";
import fs from "node:fs";
import * as prettier from "prettier";
import { generateCommandDataDoc, generateSchemaDoc } from "./utils/jsdoc.js";

async function formatCode(code) {
  return await prettier.format(code, { parser: "babel" });
}

const banner = `/* @ts-nocheck */
/* This file is automatically generated. Do not modify it manually. */`;

const useCaseJson = fs.readFileSync("src/apiUseCases.json", {
  encoding: "utf-8",
});

/**
 * @type {Map<string, {http: boolean | {method: "GET" | "PUT" | "POST" | "DELETE", path: string, disableAuth?: boolean}, description?: string}>}
 */
const useCases = new Map(JSON.parse(useCaseJson));

// load all files in the src/schemas directory
const schemaFiles = fs.readdirSync("src/schemas");
// import all files in the src/schemas directory
const schemaModules = schemaFiles
  .filter((filename) => filename.endsWith("js"))
  .map((file) => import(`../src/schemas/${file}`));

Promise.all(schemaModules).then(async (modules) => {
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
      optimize: 3,
    },
  });

  addFormats(ajv);

  const modelIndexExports = ["entity"];
  const useCaseIndexExports = [];

  const validateMap = schemas.reduce((acc, schema) => {
    if (schema.$id === "definitions.json") return acc;
    const schemaTitle = schema.title.replace(/\s+/g, "");
    acc[`validate${schemaTitle}`] = schema.$id;
    return acc;
  }, {});

  const validatorCode = standaloneCode(ajv, validateMap);

  fs.writeFileSync(
    "src/validators.js",
    await formatCode(`/* eslint-disable */\n${banner}\n\n\n${validatorCode}`)
  );

  for (const module of modules) {
    const schema = module.default;
    if (schema.$id === "definitions.json") continue;
    const schemaTitle = schema.title.replace(/\s+/g, "");
    const fileName = schemaTitle.charAt(0).toLowerCase() + schemaTitle.slice(1);
    modelIndexExports.push(fileName);
    const modelCode = generateModelCode(ajv, module);
    fs.writeFileSync(`src/models/${fileName}.js`, await formatCode(modelCode));
  }

  for (const [useCase, data] of useCases.entries()) {
    if (data.http) {
      const useCaseFileName =
        useCase.charAt(0).toLowerCase() + useCase.slice(1);
      useCaseIndexExports.push(useCaseFileName);
      const code = generateUseCaseCode(useCase, data.http, data.description);
      fs.writeFileSync(
        `src/useCases/${useCaseFileName}.js`,
        await formatCode(code)
      );
    }
  }
});

function generateModelCode(ajv, schemaModule) {
  const {
    default: schema,
    methods = {},
    statics = {},
    getters = {},
    setters = {},
  } = schemaModule;

  const jsdoc = generateSchemaDoc(schema.$id, ajv);
  const schemaTitle = schema.title.replace(/\s+/g, "");

  const entityImport = "import { Entity } from './entity';";

  const validatorImport = `import { validate${schemaTitle} as validate } from '../validators';`;

  const code = `${banner}\n
  ${entityImport}
  ${validatorImport}


  ${jsdoc}


 
  /**
   * ${schema.description ?? ""}
   * @class ${schemaTitle}
   * @extends {Entity}
   */
  export class ${schemaTitle} extends Entity {



  /**
   * @constructor
   * @param {${schemaTitle}Data} data - The data to initialize the ${schemaTitle} with
   */
	constructor(data) {
	  super(data);
	  ${Object.keys(schema.properties)
      .map((prop) => {
        const isRequired = schema.required?.includes(prop);
        if (!isRequired)
          return `if (data.${prop} !== undefined) this.${prop} = data.${prop};`;
        return `this.${prop} = data.${prop};`;
      })
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

/**
 *
 * @param {string} useCase - The name of the use case
 * @param {{method: "GET" | "PUT" | "POST" | "DELETE", endpoint:  string}} config - The configuration for the use case
 * @returns
 */
function generateUseCaseCode(
  useCase,
  { method, path: endpoint },
  description = ""
) {
  const pathParams =
    endpoint.match(/:[a-zA-Z0-9]+/g)?.map((param) => param.replace(":", "")) ||
    [];

  const httpMethod = method.toLowerCase();

  const classId = `${useCase.charAt(0).toUpperCase() + useCase.slice(1)}Command`;

  const docConfigId = `${classId}Config`;

  const dataParamsJsdoc = generateCommandDataDoc(pathParams, httpMethod);

  let code = `

        ${banner}
		  

        
			  export class ${classId} {
  
          /**  
            * @description ${description}
            * @constructor
            * @typedef {object} ${docConfigId}
            * ${dataParamsJsdoc}
            * @property {{[key:string]: any} | null} [headers] - The headers to include in the command
            * @property {{[key:string]: any} | null} [query] - The query parameters to include in the command
            * 
            * @param {${docConfigId}} commandConfig - The options to include in the command
            * @param {Object} options - The options to include in the command
            */
        constructor(commandConfig, options = {}) {
      
          
          // get parameters from path
          const pathParams = ${classId}.params
          

          let { data, query, headers } = commandConfig ?? {};

          if(typeof data === "undefined") data = null;
          if(typeof query === "undefined") query = null;
          if(typeof headers === "undefined") headers = null;
          
          
          // replace path parameters with values from params
          let url = ${classId}.url;

          if (pathParams && data) {
          for (const param of pathParams) {
          const urlParam = ":" + param;
          url = url.replace(urlParam, data[param]);
          }
          }
          
          // make sure all parameters have been replaced
          if (url.match(/:[a-zA-Z0-9]+/g)) {
          const missingParams = url.match(/:[a-zA-Z0-9]+/g);
         
            if(missingParams){
             // remove the colon from the parameter name
              const missing = missingParams.map((param) => param.replace(":", ""));
              throw new Error("Missing parameters: " + missing.join(", "))
            }
          }

          /**
           * The full URL for the use case
           * @type {string}
           * @public
           */
          this.url = url;
          /**
           * The data to send with the use case
           * @type {${docConfigId}["data"]}
           * @public
           */
          this.data = data;
          /**
           * The query parameters for the use case
           * @type {${docConfigId}["query"]}
           * @public
           */
          this.query = query;
          /**
           * The headers for the use case
           * @type {${docConfigId}["headers"]}
           * @public
           */
          this.headers = headers;
        
         
          /**
           * The configuration for the use case command
           * @type {{ url: string, method: "${httpMethod}" , data: ${docConfigId}["data"] , params: ${docConfigId}["query"], headers: ${docConfigId}["headers"] }}
           * @public
           */
          this.config = {
            method: ${classId}.method,
            url: url,
            data: data,
            params: query,
            headers: headers,
            ...options,
          };
       }

       /**
        * The required parameters for the use case
        * @type {string[]}
        */
       static params = ${JSON.stringify(pathParams)};

        /**
         * The URL for the use case, with path parameters
         * @type {string}
         */
       static url = "${endpoint}";

        /**
         * The HTTP method for the use case
         * @type {"${httpMethod}"}
         */
        static method = "${httpMethod}";

      }`;

  return code;
}
