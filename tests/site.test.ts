import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import siteContent from "../src/content/site.json";
import type { GameStatus, SectionId } from "../src/types";

/**
 * `HomePage` reads site.json through an `as SiteContent` cast, which it needs
 * because TypeScript widens JSON string literals (`status` infers as `string`,
 * not `GameStatus`). That cast also switches off every other structural check,
 * so a specimen missing a required field compiles cleanly and fails silently in
 * the browser. These tests are what the cast costs us, given back.
 */

const STATUSES: GameStatus[] = ["live", "in-trials", "original", "brewing"];
const SECTION_IDS: SectionId[] = [
  "specimenCatalog",
  "labOriginals",
  "apparatus",
  "houseRules",
  "labNotes",
];

const REQUIRED = ["id", "name", "description", "status", "url", "ogImage"] as const;
const OPTIONAL = ["inspiration", "meta", "repoUrl", "note", "ctaLabel"] as const;

const publicPath = (assetPath: string) => join(process.cwd(), "public", assetPath);

const specimens = siteContent.games as Record<string, unknown>[];

describe("site.json specimens", () => {
  it("lists at least one specimen", () => {
    expect(specimens.length).toBeGreaterThan(0);
  });

  it("uses unique ids", () => {
    const ids = specimens.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  describe.each(specimens.map((s) => [s.id as string, s] as const))("%s", (_id, specimen) => {
    it.each(REQUIRED)("has a non-empty %s", (field) => {
      expect(typeof specimen[field]).toBe("string");
      expect((specimen[field] as string).trim()).not.toBe("");
    });

    it("has a known status", () => {
      expect(STATUSES).toContain(specimen.status);
    });

    it("has no unexpected fields", () => {
      const known = new Set<string>([...REQUIRED, ...OPTIONAL]);
      expect(Object.keys(specimen).filter((k) => !known.has(k))).toEqual([]);
    });

    it("leaves optional fields either absent or meaningful", () => {
      for (const field of OPTIONAL) {
        if (!(field in specimen)) continue;
        const value = specimen[field];
        // `inspiration` and `note` are explicitly nullable; the rest are not.
        if (value === null) {
          expect(["inspiration", "note"]).toContain(field);
          continue;
        }
        expect(typeof value).toBe("string");
        expect((value as string).trim()).not.toBe("");
      }
    });

    it("points at an ogImage that exists, with a .webp sibling", () => {
      const png = specimen.ogImage as string;
      expect(png).toMatch(/\.png$/);
      expect(existsSync(publicPath(png))).toBe(true);
      // GameCard renders <source srcSet={image.replace(/\.png$/, ".webp")} />,
      // so a missing sibling is a broken image in every browser that takes it.
      expect(existsSync(publicPath(png.replace(/\.png$/, ".webp")))).toBe(true);
    });
  });
});

describe("site.json sections", () => {
  it("only uses known section ids", () => {
    for (const section of siteContent.sections) {
      expect(SECTION_IDS).toContain(section.id);
    }
  });

  it("gives every section a label", () => {
    for (const section of siteContent.sections) {
      expect(section.label.trim()).not.toBe("");
    }
  });
});
