import type { ReactNode, ComponentProps } from "react";
import { MDXProvider } from "@mdx-js/react";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

// MDX passes arbitrary HTML props at runtime; heading wrappers need loose typing
// because ComponentProps<typeof Typography> captures ref as HTMLSpanElement
// (the default component), which conflicts with component="h1" etc. in MUI v9 strict mode.
type AnyProps = Record<string, unknown>;

const components = {
  h1: (p: AnyProps) => <Typography variant="h2" component="h1" {...p} />,
  h2: (p: AnyProps) => <Typography variant="h4" component="h2" {...p} />,
  h3: (p: AnyProps) => <Typography variant="h5" component="h3" {...p} />,
  p:  (p: ComponentProps<typeof Typography>) => <Typography variant="body1" sx={{ mb: 2 }} {...p} />,
  a:  (p: ComponentProps<typeof Link>) => <Link target="_blank" rel="noopener noreferrer" {...p} />,
};

export function MdxProvider({ children }: { children: ReactNode }) {
  return <MDXProvider components={components}>{children}</MDXProvider>;
}
