#!/usr/bin/env node
// LOCAL ONLY. Renders per-note OG cards by spinning up `vite dev` and
// screenshotting /og-image?title=...&date=... via Playwright. Outputs PNGs to
// public/og/notes/<slug>.png — those are committed to git so Vercel can deploy
// them as static assets without needing Playwright in the build environment.
//
// Run after adding or renaming a lab note (or editing its title):
//     npm run build:og
// Then commit public/og/notes/ alongside the note.
//
// Bump OG_TEMPLATE_VERSION whenever OgImagePage's note-mode layout changes —
// it's part of the per-note content hash, so a bump force-regenerates every PNG.

import { spawn } from "node:child_process";
import { createHash } from "node:crypto";
import { createServer } from "node:net";
import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";
import { discoverNotes } from "./lib/notes.mjs";

const OG_TEMPLATE_VERSION = "3";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, "..");
const notesDir = join(projectRoot, "src/content/lab-notes");
const outImgDir = join(projectRoot, "public/og/notes");
const manifestPath = join(outImgDir, ".manifest.json");

function hashNote(n) {
  return createHash("sha256")
    .update([n.slug, n.date, n.title, n.description, OG_TEMPLATE_VERSION].join(" "))
    .digest("hex");
}

function readManifest() {
  if (!existsSync(manifestPath)) return {};
  try {
    return JSON.parse(readFileSync(manifestPath, "utf8"));
  } catch {
    return {};
  }
}

async function pickPort() {
  return new Promise((res, rej) => {
    const srv = createServer();
    srv.unref();
    srv.on("error", rej);
    srv.listen(0, () => {
      const port = srv.address().port;
      srv.close(() => res(port));
    });
  });
}

function startDev(port) {
  const child = spawn(
    "npx",
    ["vite", "--port", String(port), "--strictPort"],
    { cwd: projectRoot, stdio: ["ignore", "pipe", "pipe"] },
  );
  let buffer = "";
  const ready = new Promise((res, rej) => {
    const timeout = setTimeout(
      () => rej(new Error("vite did not become ready in 20s")),
      20000,
    );
    function onData(chunk) {
      buffer += chunk.toString();
      if (/Local:\s+http/.test(buffer)) {
        clearTimeout(timeout);
        child.stdout.off("data", onData);
        res();
      }
    }
    child.stdout.on("data", onData);
    child.stderr.on("data", (c) => process.stderr.write(c));
    child.on("exit", (code) => {
      clearTimeout(timeout);
      rej(new Error(`vite exited early (code ${code})`));
    });
  });
  return { child, ready };
}

function pruneStalePngs(currentSlugs) {
  if (!existsSync(outImgDir)) return;
  for (const file of readdirSync(outImgDir)) {
    if (!file.endsWith(".png")) continue;
    const slug = file.replace(/\.png$/, "");
    if (!currentSlugs.has(slug)) {
      rmSync(join(outImgDir, file));
      console.log(`[og] pruned stale ${file}`);
    }
  }
}

async function main() {
  const notes = discoverNotes(notesDir).map((n) => ({ ...n, contentHash: hashNote(n) }));
  if (notes.length === 0) {
    console.log("[og] no lab notes found — nothing to render.");
    return;
  }
  console.log(`[og] discovered ${notes.length} lab note(s).`);

  mkdirSync(outImgDir, { recursive: true });

  const manifest = readManifest();
  const toRender = notes.filter((n) => {
    const png = join(outImgDir, `${n.slug}.png`);
    return manifest[n.slug] !== n.contentHash || !existsSync(png);
  });

  if (toRender.length === 0) {
    console.log("[og] all PNGs up to date — nothing to do.");
  } else {
    const port = await pickPort();
    const dev = startDev(port);
    try {
      await dev.ready;
    } catch (err) {
      dev.child.kill("SIGTERM");
      throw err;
    }

    const browser = await chromium.launch();
    const context = await browser.newContext({
      viewport: { width: 1200, height: 630 },
      deviceScaleFactor: 1,
    });

    let hadFailure = false;
    for (const note of toRender) {
      const url =
        `http://localhost:${port}/og-image` +
        `?title=${encodeURIComponent(note.title)}`;
      const page = await context.newPage();
      try {
        await page.goto(url, { waitUntil: "networkidle", timeout: 20000 });
        await page.waitForFunction(
          () => document.body.dataset.ogReady === "1",
          null,
          { timeout: 15000 },
        );
        await page
          .locator("#og-image")
          .screenshot({ path: join(outImgDir, `${note.slug}.png`), type: "png" });
        manifest[note.slug] = note.contentHash;
        console.log(`[og] rendered ${note.slug}`);
      } catch (err) {
        hadFailure = true;
        console.error(`[og] failed to render ${note.slug}:`, err.message);
      } finally {
        await page.close();
      }
    }

    await browser.close();
    dev.child.kill("SIGTERM");

    if (hadFailure) {
      writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + "\n");
      console.error("[og] one or more notes failed to render — see logs above.");
      process.exit(1);
    }
  }

  // Prune stale entries from the manifest before writing.
  const currentSlugs = new Set(notes.map((n) => n.slug));
  for (const slug of Object.keys(manifest)) {
    if (!currentSlugs.has(slug)) delete manifest[slug];
  }
  writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + "\n");
  pruneStalePngs(currentSlugs);
  console.log(`[og] done. Commit public/og/notes/ alongside the note.`);
}

main().catch((err) => {
  console.error("[og] fatal:", err);
  process.exit(1);
});
