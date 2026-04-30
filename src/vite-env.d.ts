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
