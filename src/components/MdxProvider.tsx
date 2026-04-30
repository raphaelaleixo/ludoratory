import type { ReactNode, ComponentProps } from "react";
import { MDXProvider } from "@mdx-js/react";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

const components = {
  h1: (p: ComponentProps<typeof Typography>) => <Typography variant="h2" component="h1" {...p} />,
  h2: (p: ComponentProps<typeof Typography>) => <Typography variant="h4" component="h2" {...p} />,
  h3: (p: ComponentProps<typeof Typography>) => <Typography variant="h5" component="h3" {...p} />,
  p:  (p: ComponentProps<typeof Typography>) => <Typography variant="body1" sx={{ mb: 2 }} {...p} />,
  a:  (p: ComponentProps<typeof Link>) => <Link target="_blank" rel="noopener noreferrer" {...p} />,
};

export function MdxProvider({ children }: { children: ReactNode }) {
  return <MDXProvider components={components}>{children}</MDXProvider>;
}
