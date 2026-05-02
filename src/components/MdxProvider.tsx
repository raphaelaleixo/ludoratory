import type { ReactNode, ComponentProps } from "react";
import { MDXProvider } from "@mdx-js/react";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import { GameCard } from "./GameCard";

// MDX passes arbitrary HTML props at runtime; heading wrappers need loose typing
// because ComponentProps<typeof Typography> captures ref as HTMLSpanElement
// (the default component), which conflicts with component="h1" etc. in MUI v9 strict mode.
type AnyProps = Record<string, unknown>;

function Pointer({
  children,
  direction = "up",
}: {
  children?: ReactNode;
  direction?: "up" | "down";
}) {
  return (
    <Box
      sx={{
        position: "relative",
        my: 2,
        pl: 5,
        color: "accent.amber",
        fontFamily: '"Caveat", cursive',
        fontSize: "24px",
        lineHeight: 1.15,
        "& p": {
          fontFamily: "inherit",
          fontSize: "inherit",
          lineHeight: "inherit",
          mb: 0,
        },
      }}
    >
      <Box
        component="svg"
        aria-hidden="true"
        viewBox="0 0 50 60"
        sx={{
          position: "absolute",
          left: 0,
          ...(direction === "up" ? { top: "0.1em" } : { bottom: "0.1em" }),
          width: 28,
          height: 34,
          color: "accent.amber",
          overflow: "visible",
          transform:
            direction === "down"
              ? "rotate(-12deg) scale(-1, -1)"
              : "rotate(-12deg) scaleX(-1)",
        }}
      >
        <path
          d="M 22 56 Q 36 36, 28 14"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M 28 14 L 37 22"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M 28 14 L 26 26"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </Box>
      {children}
    </Box>
  );
}

const components = {
  h1: (p: AnyProps) => <Typography variant="h2" component="h1" {...p} />,
  h2: (p: AnyProps) => (
    <Typography
      variant="h4"
      component="h2"
      sx={{
        fontFamily: '"Space Grotesk", "DM Sans", sans-serif',
        fontWeight: 700,
        letterSpacing: "-0.015em",
      }}
      {...p}
    />
  ),
  h3: (p: AnyProps) => (
    <Typography
      variant="h5"
      component="h3"
      sx={{
        fontFamily: '"Space Grotesk", "DM Sans", sans-serif',
        fontWeight: 700,
        letterSpacing: "-0.015em",
      }}
      {...p}
    />
  ),
  p:  (p: ComponentProps<typeof Typography>) => <Typography variant="body1" sx={{ mb: 2 }} {...p} />,
  a: (p: ComponentProps<typeof Link>) => (
    <Link
      target="_blank"
      rel="noopener noreferrer"
      sx={{
        color: "accent.acid",
        textDecoration: "underline",
        textDecorationColor: "rgba(127, 255, 212, 0.4)",
        textDecorationThickness: "1px",
        textUnderlineOffset: "3px",
        transition: "color 150ms ease, text-decoration-color 150ms ease",
        "&:hover": {
          color: "#aaffe0",
          textDecorationColor: "currentColor",
        },
      }}
      {...p}
    />
  ),
  ul: (p: AnyProps) => (
    <Box
      component="ul"
      sx={{
        pl: 3,
        mb: 2,
        listStyleType: '"▸  "',
        "& > li": { mb: 0.75, pl: 0.5 },
        "& > li::marker": {
          color: "text.disabled",
          fontSize: "0.9em",
        },
      }}
      {...p}
    />
  ),
  ol: (p: AnyProps) => (
    <Box
      component="ol"
      sx={{
        pl: 4,
        mb: 2,
        listStyleType: "decimal-leading-zero",
        "& > li": { mb: 0.75, pl: 0.5 },
        "& > li::marker": {
          color: "text.disabled",
          fontFamily: '"Space Grotesk", "DM Sans", sans-serif',
          fontWeight: 600,
          fontSize: "0.85em",
          fontVariantNumeric: "tabular-nums",
          letterSpacing: "0.04em",
        },
      }}
      {...p}
    />
  ),
  li: (p: AnyProps) => <Typography component="li" variant="body1" {...p} />,
  blockquote: (p: AnyProps) => (
    <Box
      component="blockquote"
      sx={{
        m: 0,
        my: 2,
        pl: 2,
        borderLeft: "2px solid",
        borderColor: "accent.magenta",
        color: "accent.magenta",
        fontFamily: '"Caveat", cursive',
        fontSize: "24px",
        lineHeight: 1.15,
        "& p": {
          fontFamily: "inherit",
          fontSize: "inherit",
          lineHeight: "inherit",
          mb: 0,
        },
      }}
      {...p}
    />
  ),
  code: (p: AnyProps) => (
    <Box
      component="code"
      sx={{
        fontFamily: '"JetBrains Mono", ui-monospace, monospace',
        fontSize: "0.9em",
        bgcolor: "rgba(138, 161, 161, 0.12)",
        color: "text.disabled",
        px: 0.6,
        py: 0.2,
        borderRadius: "3px",
      }}
      {...p}
    />
  ),
  img: ({ title, ...rest }: AnyProps) => {
    const isWide = title === "wide";
    return (
      <Box
        component="img"
        title={isWide ? undefined : (title as string | undefined)}
        loading="lazy"
        decoding="async"
        sx={{
          display: "block",
          maxWidth: "100%",
          height: "auto",
          borderRadius: "6px",
          border: "1px solid #1f2a2a",
          my: 3,
          ...(isWide && {
            width: { xs: "100%", md: "calc(100% + 280px)" },
            maxWidth: { xs: "100%", md: "calc(100% + 280px)" },
            ml: { xs: 0, md: "-140px" },
          }),
        }}
        {...rest}
      />
    );
  },
  hr: () => (
    <Box
      component="hr"
      aria-hidden="true"
      sx={{
        border: 0,
        borderTop: "1px dashed #2a3a3a",
        my: 4,
      }}
    />
  ),
  pre: (p: AnyProps) => (
    <Box
      component="pre"
      sx={{
        mx: 0,
        mt: 2,
        mb: 2,
        p: 2,
        bgcolor: "rgba(138, 161, 161, 0.08)",
        border: "1px solid",
        borderColor: "rgba(138, 161, 161, 0.18)",
        borderRadius: "4px",
        overflow: "auto",
        fontSize: "13px",
        "& code": {
          bgcolor: "transparent",
          color: "text.primary",
          p: 0,
          fontSize: "inherit",
        },
      }}
      {...p}
    />
  ),
  NoteUp: ({ children }: { children?: ReactNode }) => (
    <Pointer direction="up">{children}</Pointer>
  ),
  NoteDown: ({ children }: { children?: ReactNode }) => (
    <Pointer direction="down">{children}</Pointer>
  ),
  GameCard,
};

export function MdxProvider({ children }: { children: ReactNode }) {
  return <MDXProvider components={components}>{children}</MDXProvider>;
}
