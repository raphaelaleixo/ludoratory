#!/usr/bin/env node
// Vercel-safe postbuild step. Zero browser dependencies — just file I/O.
// For each lab note, clones dist/index.html into dist/lab-notes/<slug>/index.html
// with og:* / twitter:* meta tags rewritten to point at the per-note PNG.
//
// PNGs are produced locally by scripts/generate-og-pngs.mjs and committed to
// public/og/notes/, which Vite copies into dist/og/notes/ during build.

import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { discoverNotes } from "./lib/notes.mjs";

const SITE_ORIGIN = "https://ludoratory.com";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, "..");
const distDir = join(projectRoot, "dist");
const distIndex = join(distDir, "index.html");
const notesDir = join(projectRoot, "src/content/lab-notes");
const outHtmlBase = join(distDir, "lab-notes");
const distImgDir = join(distDir, "og/notes");

function escAttr(s) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function escHtml(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function rewriteHtml(template, { slug, title, description }) {
  const fullTitle = `${title} — Ludoratory`;
  const noteUrl = `${SITE_ORIGIN}/lab-notes/${slug}`;
  const imageUrl = `${SITE_ORIGIN}/og/notes/${slug}.png`;

  let out = template.replace(
    /<title>[\s\S]*?<\/title>/,
    `<title>${escHtml(fullTitle)}</title>`,
  );

  function replaceMeta(attr, key, value) {
    const re = new RegExp(
      `<meta\\s+${attr}=("|')${key}\\1\\s+content=("|')[^"']*\\2\\s*/?>`,
      "g",
    );
    out = out.replace(re, `<meta ${attr}="${key}" content="${escAttr(value)}" />`);
  }

  replaceMeta("name", "description", description);
  replaceMeta("property", "og:title", fullTitle);
  replaceMeta("property", "og:description", description);
  replaceMeta("property", "og:url", noteUrl);
  replaceMeta("property", "og:image", imageUrl);
  replaceMeta("property", "og:image:secure_url", imageUrl);
  replaceMeta("property", "og:image:alt", title);
  replaceMeta("name", "twitter:title", fullTitle);
  replaceMeta("name", "twitter:description", description);
  replaceMeta("name", "twitter:image", imageUrl);
  replaceMeta("name", "twitter:image:alt", title);

  return out;
}

function pruneStaleHtml(currentSlugs) {
  if (!existsSync(outHtmlBase)) return;
  for (const entry of readdirSync(outHtmlBase, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    if (!currentSlugs.has(entry.name)) {
      rmSync(join(outHtmlBase, entry.name), { recursive: true, force: true });
    }
  }
}

function main() {
  if (!existsSync(distIndex)) {
    console.error("[og-html] dist/index.html missing — run `vite build` first.");
    process.exit(1);
  }

  const notes = discoverNotes(notesDir);
  if (notes.length === 0) {
    console.log("[og-html] no lab notes found — nothing to do.");
    return;
  }

  // Warn (but don't fail) if a PNG is missing — the page will still serve, just
  // with a broken og:image. The author probably forgot to run `npm run build:og`.
  for (const n of notes) {
    if (!existsSync(join(distImgDir, `${n.slug}.png`))) {
      console.warn(
        `[og-html] WARN: public/og/notes/${n.slug}.png missing. ` +
          `Run \`npm run build:og\` and commit the PNG.`,
      );
    }
  }

  mkdirSync(outHtmlBase, { recursive: true });
  const template = readFileSync(distIndex, "utf8");
  for (const note of notes) {
    const html = rewriteHtml(template, note);
    const dir = join(outHtmlBase, note.slug);
    mkdirSync(dir, { recursive: true });
    writeFileSync(join(dir, "index.html"), html);
  }
  console.log(`[og-html] wrote per-note HTML for ${notes.length} note(s).`);

  pruneStaleHtml(new Set(notes.map((n) => n.slug)));
}

main();
