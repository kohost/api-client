import fs from "node:fs";
export const RemoveNodeExportsPlugin = {
  name: "remove-node-exports",
  setup(build) {
    build.onLoad({ filter: /index\.mjs$/ }, async (args) => {
      if (build.initialOptions.platform !== "browser") {
        return null; // Skip if not browser platform
      }

      const source = await fs.promises.readFile(args.path, "utf8");

      const modified = source.replace(
        /export\s*{\s*KohostAMQPClient\s+as\s+AMQPClient\s*}\s*from\s*["']\.\/amqpClient["'];?\n?/g,
        ""
      );

      return {
        contents: modified,
        loader: "js",
      };
    });
  },
};
