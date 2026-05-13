#!/usr/bin/env node
import { readFileSync, writeFileSync, readdirSync, statSync } from "fs";
import { join } from "path";

const EXT_TARGETS = [".js", ".d.ts"];

function rewrite(dir) {
  for (const file of readdirSync(dir)) {
    const filePath = join(dir, file);
    if (statSync(filePath).isDirectory()) {
      rewrite(filePath);
      continue;
    }
    if (!EXT_TARGETS.some((ext) => file.endsWith(ext))) continue;
    const content = readFileSync(filePath, "utf8");
    const next = content.replace(
      /(from\s+["']|import\s*\(\s*["'])(\.\.?\/[^"']+)(["'])/g,
      (match, prefix, path, suffix) =>
        path.endsWith(".js") ? match : `${prefix}${path}.js${suffix}`,
    );
    if (next !== content) writeFileSync(filePath, next);
  }
}

const target = process.argv[2] ?? "dist";
rewrite(target);
