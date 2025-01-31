// Function extractor that analyzes AST to find dependencies

import * as acorn from "acorn";
import * as walk from "acorn-walk";

export function extractFunction(sourceCode, exportName) {
  const ast = acorn.parse(sourceCode, {
    ecmaVersion: "latest",
    sourceType: "module",
  });

  // First find the actual function name from the export
  let targetFunctionName = null;

  walk.simple(ast, {
    ExportNamedDeclaration(node) {
      if (node.declaration && node.declaration.type === "VariableDeclaration") {
        const declarator = node.declaration.declarations[0];
        if (
          declarator &&
          declarator.id.name === exportName &&
          declarator.init
        ) {
          targetFunctionName = declarator.init.name;
          console.log(`Found target function: ${targetFunctionName}`);
        }
      }
    },
  });

  if (!targetFunctionName) {
    throw new Error(`Could not find function name for export ${exportName}`);
  }

  // Find the target function node and gather its dependencies
  let targetNode = null;
  const dependencies = new Set();

  // First pass: find the target function and collect potential dependencies
  walk.simple(ast, {
    FunctionDeclaration(node) {
      if (node.id.name === targetFunctionName) {
        targetNode = node;
      }
    },
    Identifier(node) {
      // Collect any references to other functions/variables
      if (
        node.name.startsWith("validate") ||
        node.name.startsWith("func") ||
        node.name.startsWith("schema")
      ) {
        dependencies.add(node.name);
      }
    },
  });

  if (!targetNode) {
    throw new Error(
      `Could not find function definition for ${targetFunctionName}`
    );
  }

  // Collect all needed function definitions
  const codeSegments = new Map();

  walk.simple(ast, {
    FunctionDeclaration(node) {
      if (
        node.id.name === targetFunctionName ||
        dependencies.has(node.id.name)
      ) {
        codeSegments.set(node.start, sourceCode.slice(node.start, node.end));
      }
    },
    VariableDeclaration(node) {
      for (const declarator of node.declarations) {
        if (dependencies.has(declarator.id.name)) {
          codeSegments.set(node.start, sourceCode.slice(node.start, node.end));
        }
      }
    },
  });

  // Sort the code segments by their position to maintain original order
  const sortedSegments = Array.from(codeSegments.entries())
    .sort(([posA], [posB]) => posA - posB)
    .map(([_, code]) => code);

  // Add the export statement at the end
  return (
    sortedSegments.join("\n\n") +
    `\n\nexport const ${exportName} = ${targetFunctionName};`
  );
}

// Example usage:
/*
const sourceCode = `
function helper1(x) {
  return x * 2;
}

function helper2(x) {
  return helper1(x) + 1;
}

function mainFunction(x) {
  return helper2(x) * 3;
}
`;

const extracted = extractFunction(sourceCode, 'mainFunction');
console.log(extracted);
*/
