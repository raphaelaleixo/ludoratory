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
          background: "linear-gradient(180deg, #c8ff7a 0%, #79e02f 100%)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          color: "transparent",
          textShadow: "0 0 24px rgba(163, 255, 92, 0.4)",
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

      {/* thesis */}
      <Typography sx={{ fontSize: 18, lineHeight: 1.6, color: "text.secondary", maxWidth: "60ch", mb: 1 }}>
        {thesis}
      </Typography>
    </Box>
  );
}
