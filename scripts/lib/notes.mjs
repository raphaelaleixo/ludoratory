// Shared note discovery + content extraction. Used by both the local PNG
// generator (scripts/generate-og-pngs.mjs) and the Vercel-side HTML rewriter
// (scripts/rewrite-og-html.mjs).

import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

export const POST_FILE_RE = /^(\d{4}-\d{2}-\d{2})-([a-z0-9-]+)\.(md|mdx)$/i;
export const H1_RE = /^\s*#\s+(.+?)\s*$/m;

export function humanize(slug) {
  const [first, ...rest] = slug.split("-");
  if (!first) return slug;
  return [first.charAt(0).toUpperCase() + first.slice(1), ...rest].join(" ");
}

export function extractDescription(source) {
  const withoutH1 = source.replace(H1_RE, "").trim();
  const lines = withoutH1.split("\n");
  let inFence = false;
  for (const raw of lines) {
    const line = raw.trim();
    if (line.startsWith("```")) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;
    if (!line) continue;
    if (line.startsWith("#")) continue;
    if (line.startsWith("<")) continue;
    if (line.startsWith("![")) continue;
    const cleaned = line
      .replace(/`([^`]+)`/g, "$1")
      .replace(/\*\*([^*]+)\*\*/g, "$1")
      .replace(/\*([^*]+)\*/g, "$1")
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
    return cleaned.length > 200 ? cleaned.slice(0, 197) + "…" : cleaned;
  }
  return "";
}

export function discoverNotes(notesDir) {
  if (!existsSync(notesDir)) return [];
  const out = [];
  for (const file of readdirSync(notesDir)) {
    const m = file.match(POST_FILE_RE);
    if (!m) continue;
    const [, date, slug] = m;
    const source = readFileSync(join(notesDir, file), "utf8");
    const titleMatch = source.match(H1_RE);
    const title = titleMatch ? titleMatch[1] : humanize(slug);
    const description = extractDescription(source) || `Lab note · ${date}`;
    out.push({ slug, date, title, description, file });
  }
  return out;
}
