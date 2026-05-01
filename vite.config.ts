// vitest v4 moved the `test` field augmentation out of the root `vitest` package
// and into `vitest/config` — that's why the reference here uses "vitest/config" while
// tsconfig.node.json's `types` array uses "vitest". Both are needed.
/// <reference types="vitest/config" />
import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import mdx from "@mdx-js/rollup";
import path from "path";
import fs from "node:fs";

const LAB_NOTES_VIRTUAL = "virtual:lab-notes-meta";
const LAB_NOTES_RESOLVED = "\0" + LAB_NOTES_VIRTUAL;

function labNotesMeta(): Plugin {
  let root = "";
  const dir = () => path.resolve(root, "src/content/lab-notes");

  function buildMeta(): Record<string, { title: string }> {
    const d = dir();
    if (!fs.existsSync(d)) return {};
    const out: Record<string, { title: string }> = {};
    for (const file of fs.readdirSync(d)) {
      if (!/\.(md|mdx)$/i.test(file)) continue;
      const source = fs.readFileSync(path.join(d, file), "utf8");
      const match = source.match(/^\s*#\s+(.+?)\s*$/m);
      out[file] = { title: match ? match[1] : "" };
    }
    return out;
  }

  return {
    name: "lab-notes-meta",
    configResolved(config) {
      root = config.root;
    },
    resolveId(id) {
      if (id === LAB_NOTES_VIRTUAL) return LAB_NOTES_RESOLVED;
    },
    load(id) {
      if (id !== LAB_NOTES_RESOLVED) return;
      return `export default ${JSON.stringify(buildMeta())};`;
    },
    handleHotUpdate({ file, server }) {
      if (file.startsWith(dir())) {
        const mod = server.moduleGraph.getModuleById(LAB_NOTES_RESOLVED);
        if (mod) {
          server.moduleGraph.invalidateModule(mod);
          server.ws.send({ type: "full-reload" });
        }
      }
    },
  };
}

export default defineConfig({
  plugins: [
    {
      enforce: "pre",
      ...mdx({
        providerImportSource: "@mdx-js/react",
        format: "mdx",
        mdExtensions: [".md"],
        mdxExtensions: [".md", ".mdx"],
      }),
    },
    labNotesMeta(),
    react(),
  ],
  resolve: {
    alias: {
      react: path.resolve(__dirname, "node_modules/react"),
      "react-dom": path.resolve(__dirname, "node_modules/react-dom"),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/test-setup.ts"],
  },
});
