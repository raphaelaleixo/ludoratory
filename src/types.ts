export type GameStatus = "live" | "in-trials" | "original" | "brewing";
export type ScribbleColor = "acid" | "amber" | "magenta" | "violet" | "gray";

export interface Attribution {
  name: string;
  url: string;
}

/**
 * Anything catalogued on the site — a game, a printable, a toy, a tool.
 * Only the fields every specimen genuinely has are required; the rest are
 * optional so a non-game doesn't have to fake a player count or a repo.
 */
export interface Specimen {
  id: string;
  name: string;
  description: string;
  status: GameStatus;
  url: string;
  ogImage: string;
  /** Credit line for adaptations, or a freeform subtitle for originals. */
  inspiration?: string | null;
  /** Freeform footer caption: "5–12 players", "print & play", "~20 min". */
  meta?: string;
  /** Omitted for specimens with no public source. */
  repoUrl?: string;
  /** Handwritten scribble beside the title. */
  note?: string | null;
  /** Overrides the card's "Play now ↗" overlay. */
  ctaLabel?: string;
}

export interface Apparatus {
  name: string;
  version: string;
  description: string;
  installSnippet: string;
  repoUrl: string;
  docsUrl: string;
  license: string;
}

export interface HouseRule {
  number: string;
  title: string;
  description: string;
}

export interface FooterLink {
  label: string;
  url: string;
}

export interface SiteCopy {
  name: string;
  establishedRoman: string;
  attribution: Attribution;
  headline: string[];
  headlineGlowToken: string;
  thesis: string;
}

export type SectionId = "specimenCatalog" | "labOriginals" | "apparatus" | "houseRules" | "labNotes";

export interface Section {
  id: SectionId;
  label: string;
  note?: string;
}

export interface SiteContent {
  site: SiteCopy;
  sections: Section[];
  games: Specimen[];
  apparatus: Apparatus;
  houseRules: HouseRule[];
  footer: { links: FooterLink[]; license: FooterLink };
}
