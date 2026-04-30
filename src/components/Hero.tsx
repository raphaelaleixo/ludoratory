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
  const { name, establishedRoman, attribution, headline, headlineGlowToken, thesis, warning, marginScribbles } = site;
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
          justifyContent: "space-between",
          alignItems: "center",
          fontFamily: '"Space Grotesk", "Inter", sans-serif',
          fontSize: "14px",
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "text.disabled",
          mb: 3.5,
        }}
      >
        <Box sx={{ display: "inline-flex", alignItems: "center", gap: 1, color: "accent.acid" }}>
          <Ludoratory size={20} />
          <Box
            component="span"
            sx={{
              fontFamily: '"Space Grotesk", "Inter", sans-serif',
              fontWeight: 700,
              fontSize: 14,
              letterSpacing: "0.04em",
            }}
          >
            {name.toUpperCase()}
          </Box>
          <Box component="span" sx={{ color: "text.disabled", fontWeight: 400, ml: 0.5 }}>
            ·{" "}
            <Link href={attribution.url} target="_blank" rel="noopener noreferrer" sx={{ color: "inherit", textDecoration: "none", "&:hover": { textDecoration: "underline" } }}>
              by {attribution.name} ↗
            </Link>
          </Box>
        </Box>
        <Box>EST. {establishedRoman} · SPECIMENS: {String(specimenCount).padStart(2, "0")} · STATUS: ACTIVE</Box>
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
      <Typography sx={{ fontSize: 14, lineHeight: 1.55, color: "text.secondary", maxWidth: 540, mb: 1 }}>
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
