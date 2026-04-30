import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import type { SiteCopy } from "../types";
import { Ludoratory } from "./Ludoratory";
import { MarginScribble } from "./MarginScribble";

interface HeroProps {
  site: SiteCopy;
  specimenCount: number;
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
          fontStyle: "italic",
          display: "inline-block",
        }}
      >
        {glowToken}
      </Box>
      {after}
    </>
  );
}

export function Hero({ site, specimenCount }: HeroProps) {
  const { name, attribution, headline, headlineGlowToken, thesis, warning, marginScribbles } = site;
  const scribblePositions = [
    { top: 95, right: 48, rotate: 7, fontSize: 24 },
    { top: 165, right: 24, rotate: -3, fontSize: 24 },
    { top: 235, right: 56, rotate: -10, fontSize: 24 },
  ];

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
          mb: 3.5,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: { xs: "flex-start", md: "center" },
            gap: { xs: 0.75, md: 1 },
          }}
        >
          <Box sx={{ display: "inline-flex", alignItems: "center", gap: 1, color: "accent.acid" }}>
            <Ludoratory size={28} />
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
          <Box sx={{ display: "inline-flex", alignItems: "center", color: "text.secondary", fontWeight: 400 }}>
            <Box component="span" sx={{ display: { xs: "none", md: "inline" }, mr: 0.75 }}>·</Box>
            <Link href={attribution.url} target="_blank" rel="noopener noreferrer" sx={{ color: "inherit", textDecoration: "none", "&:hover": { textDecoration: "underline" } }}>
              by {attribution.name} ↗
            </Link>
          </Box>
        </Box>
        <Box>SPECIMENS: {String(specimenCount).padStart(2, "0")}</Box>
      </Box>

      {/* headline */}
      <Typography
        variant="h1"
        component="h1"
        sx={{ fontSize: { xs: 38, md: 56 }, lineHeight: 0.92, color: "text.primary", m: 0, mb: 2.25, maxWidth: "92%" }}
      >
        {headline.map((line, i) => (
          <Box component="span" key={i} sx={{ display: "block" }}>
            <HeadlineLine line={line} glowToken={headlineGlowToken} />
          </Box>
        ))}
      </Typography>

      {/* thesis + warning */}
      <Typography sx={{ fontSize: 16, lineHeight: 1.55, color: "text.secondary", maxWidth: 540, mb: 1 }}>
        {thesis}
      </Typography>
      <Box sx={{ fontFamily: '"Caveat", cursive', fontSize: 24, lineHeight: 1, color: "accent.magenta", transform: "rotate(-1.5deg)", display: "inline-block", mt: 0.75 }}>
        {warning}
      </Box>

      {/* margin scribbles */}
      {marginScribbles.map((s, i) => {
        const pos = scribblePositions[i] ?? scribblePositions[scribblePositions.length - 1];
        return (
          <MarginScribble
            key={i}
            text={s.text}
            color={s.color}
            rotate={pos.rotate}
            fontSize={pos.fontSize}
            sx={{ top: `${pos.top}px`, right: `${pos.right}px`, display: { xs: "none", md: "block" } }}
          />
        );
      })}
    </Box>
  );
}
