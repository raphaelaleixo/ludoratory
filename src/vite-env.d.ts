/// <reference types="vite/client" />

declare module "*.json" {
  const value: unknown;
  export default value;
}

declare module "*.mdx" {
  import type { ComponentType } from "react";
  const Component: ComponentType<Record<string, unknown>>;
  export default Component;
}

declare module "virtual:lab-notes-meta" {
  const meta: Record<string, { title: string }>;
  export default meta;
}
