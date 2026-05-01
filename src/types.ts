export type GameStatus = "live" | "in-trials" | "original" | "brewing";
export type ScribbleColor = "acid" | "amber" | "magenta" | "violet" | "gray";

export interface Attribution {
  name: string;
  url: string;
}

export interface Game {
  id: string;
  name: string;
  inspiration: string | null;
  description: string;
  players: string;
  status: GameStatus;
  url: string;
  repoUrl: string;
  ogImage: string;
  note: string | null;
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
  games: Game[];
  apparatus: Apparatus;
  houseRules: HouseRule[];
  footer: { links: FooterLink[]; license: FooterLink };
}
