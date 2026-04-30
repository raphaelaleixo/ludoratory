export type GameStatus = "live" | "in-trials" | "original" | "brewing";
export type TapeVariant = "yellow" | "cream" | "blue" | "orange";
export type ScribbleColor = "acid" | "amber" | "magenta";

export interface Attribution {
  name: string;
  url: string;
}

export interface MarginScribbleData {
  text: string;
  color: ScribbleColor;
}

export interface Game {
  id: string;
  specimen: string;
  name: string;
  inspiration: string | null;
  description: string;
  players: string;
  status: GameStatus;
  url: string;
  repoUrl: string;
  ogImage: string;
  tapeVariant: TapeVariant;
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
  marginScribbles: MarginScribbleData[];
}

export interface SectionNotes {
  specimenCatalog: string;
  labOriginals: string;
  apparatus: string;
}

export interface SiteContent {
  site: SiteCopy;
  sectionNotes: SectionNotes;
  games: Game[];
  apparatus: Apparatus;
  houseRules: HouseRule[];
  footer: { links: FooterLink[]; license: FooterLink };
}
