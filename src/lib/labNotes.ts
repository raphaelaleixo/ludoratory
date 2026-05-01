import type { ComponentType } from "react";
import meta from "virtual:lab-notes-meta";

export interface Post {
  slug: string;
  title: string;
  date: string;
  Component: ComponentType;
}

const POST_PATH_RE = /\/(\d{4}-\d{2}-\d{2})-([a-z0-9-]+)\.mdx?$/i;

const components = import.meta.glob<{ default: ComponentType }>(
  "../content/lab-notes/*.{md,mdx}",
  { eager: true },
);

function humanize(slug: string): string {
  const [first, ...rest] = slug.split("-");
  if (!first) return slug;
  return [first.charAt(0).toUpperCase() + first.slice(1), ...rest].join(" ");
}

export const posts: Post[] = Object.entries(components)
  .map(([path, mod]): Post | null => {
    const m = path.match(POST_PATH_RE);
    if (!m) return null;
    const [, date, slug] = m;
    const file = path.split("/").pop() ?? "";
    const title = meta[file]?.title || humanize(slug);
    return { slug, date, title, Component: mod.default };
  })
  .filter((p): p is Post => p !== null)
  .sort((a, b) => (a.date > b.date ? -1 : a.date < b.date ? 1 : 0));

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}
