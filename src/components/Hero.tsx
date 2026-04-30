import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import type { SiteCopy } from "../types";
import { Ludoratory } from "./Ludoratory";

interface HeroProps {
  site: SiteCopy;
}

function HeadlineLine({ line, glowToken }: { line: string; glowToken: string }) {
  if (!line.includes(glowToken)) return <>{line}</>;
  const [before, after] = line.split(glowToken);
  return (
    <>
      {before}
      <Box
        component="span"
        sx={{
          background: "linear-gradient(180deg, #aaffe0 0%, #4fd6b0 100%)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          color: "transparent",
          textShadow: "0 0 24px rgba(127, 255, 212, 0.4)",
          display: "inline-block",
        }}
      >
        {glowToken}
      </Box>
      {after}
    </>
  );
}

export function Hero({ site }: HeroProps) {
  const { name, attribution, headline, headlineGlowToken, thesis } = site;

  return (
    <Box sx={{ position: "relative" }}>
      {/* logo bar */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: { xs: "flex-start", md: "space-between" },
          alignItems: { xs: "flex-start", md: "center" },
          gap: { xs: 0.75, md: 0 },
          fontFamily: '"Space Grotesk", "DM Sans", sans-serif',
          fontSize: "12px",
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "text.secondary",
          mb: 4.5,
        }}
      >
        <Box sx={{ display: "inline-flex", alignItems: "center", gap: 1, color: "accent.acid" }}>
          <Ludoratory size={36} />
          <Box
            component="span"
            sx={{
              fontFamily: '"Space Grotesk", "DM Sans", sans-serif',
              fontWeight: 700,
              fontSize: 18,
              letterSpacing: "0.04em",
            }}
          >
            {name.toUpperCase()}
          </Box>
        </Box>
        <Link
          href={attribution.url}
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            color: "text.secondary",
            fontWeight: 400,
            textDecoration: "none",
            "&:hover": { textDecoration: "underline" },
          }}
        >
          by {attribution.name} ↗
        </Link>
      </Box>

      {/* headline */}
      <Typography
        variant="h1"
        component="h1"
        sx={{ fontSize: { xs: 44, md: 72 }, lineHeight: 0.95, color: "text.primary", m: 0, mb: 3 }}
      >
        {headline.map((line, i) => (
          <Box component="span" key={i} sx={{ display: "block" }}>
            <HeadlineLine line={line} glowToken={headlineGlowToken} />
          </Box>
        ))}
      </Typography>

      {/* handwritten margin note pointing back to the headline (md+: arrow left of text; xs/sm: arrow right of text, pointing up) */}
      <Box
        aria-hidden="true"
        sx={{
          position: { xs: "static", md: "absolute" },
          top: { md: 80, lg: 90 },
          right: { md: 0, lg: 8 },
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 1,
          color: "accent.amber",
          fontFamily: '"Caveat", cursive',
          fontSize: { xs: 22, md: 26 },
          lineHeight: 1.05,
          textAlign: "left",
          transform: { xs: "rotate(-2deg)", md: "rotate(-4deg)" },
          pointerEvents: "none",
          mt: { xs: -0.5, md: 0 },
          mb: { xs: 3, md: 0 },
          ml: { xs: 1.5, md: 0 },
        }}
      >
        {/* desktop arrow: short squiggle pointing left toward the headline */}
        <Box
          component="svg"
          viewBox="0 0 90 50"
          sx={{
            width: 80,
            height: 44,
            overflow: "visible",
            display: { xs: "none", md: "block" },
          }}
        >
          <path
            d="M 82 16 Q 46 14, 10 28"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="M 10 28 L 22 30"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="M 10 28 L 18 19"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </Box>

        <Box component="span">
          bring friends.<br />you’ll play again
        </Box>

        {/* mobile arrow: short squiggle to the right of text, pointing up toward the headline */}
        <Box
          component="svg"
          viewBox="0 0 50 60"
          sx={{
            width: 42,
            height: 50,
            overflow: "visible",
            display: { xs: "block", md: "none" },
            transform: "rotate(30deg)",
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
      </Box>

      {/* thesis */}
      <Typography sx={{ fontSize: 18, lineHeight: 1.6, color: "text.secondary", maxWidth: "60ch", mb: 1 }}>
        {thesis}
      </Typography>
    </Box>
  );
}
