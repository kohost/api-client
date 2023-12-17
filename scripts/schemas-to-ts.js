// convert json schemas to typescript using typeconv
import fs from "node:fs";
import path from "node:path";
import {
  getJsonSchemaReader,
  getTypeScriptWriter,
  makeConverter,
} from "typeconv";

import $RefParser from "@apidevtools/json-schema-ref-parser";
const __dirname = new URL(".", import.meta.url).pathname;

const refParser = $RefParser;

const reader = getJsonSchemaReader();
const writer = getTypeScriptWriter({ unsupported: "ignore" });
const { convert } = makeConverter(reader, writer);

function getAllSchemas(dirPath) {
  const files = [];

  function readFilesRecursively(directory) {
    const entries = fs.readdirSync(directory, { withFileTypes: true });

    entries.forEach((entry) => {
      const entryPath = path.join(directory, entry.name);

      if (entry.isDirectory()) {
        readFilesRecursively(entryPath); // Recursively read subdirectories
      } else if (
        entry.isFile() &&
        entry.name.endsWith(".json") &&
        entry.name !== "definitions.json"
      ) {
        const relativePath = path.relative(dirPath, entryPath);
        files.push(relativePath); // Add relative file path to the files array if it's a JSON file
      }
    });
  }

  readFilesRecursively(dirPath);

  return files;
}

const schemaDir = path.resolve(__dirname, "../src/schemas");
const schemaFiles = getAllSchemas(schemaDir);

function parseAndBundleSchemas(files = []) {
  const allFiles = files.map((file) => {
    return refParser.dereference(`src/schemas/${file}`);
  });

  return Promise.all(allFiles);
}

parseAndBundleSchemas(schemaFiles).then(async (schemas) => {
  console.log(`Total Schema Files: ${schemas.length}`);
  for (const indx in schemas) {
    try {
      const schema = schemas[indx];
      // title is schema title without spaces
      const title = schema.title.replace(/\s/g, "") + "Schema";

      console.log(`Converting ${title}...`);

      await convert({ data: { definitions: { [title]: schema } } }).then(
        (result) => {
          console.log(`${title} completed successfully`);
          // write to file at /src/types/{title}.d.ts and allow overwrites
          fs.writeFileSync(
            path.resolve(__dirname, `../src/types/${title}.d.ts`),
            result.data
          );
          return result;
        }
      );
    } catch (error) {
      console.log(error);
    }
  }
});
