import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import type { Game, TapeVariant } from "../types";

interface GameCardProps {
  game: Game;
  /** Even-indexed (0, 2 — left column) cards tilt left; odd tilt right. */
  index?: number;
}

const tapeRotation = [-3, 3, -2, 2.5];
const tapePosition: Array<"left" | "right"> = ["left", "right", "left", "right"];

const noteColors = ["#a3ff5c", "#ffd166", "#ff9bbd"]; // acid, amber, magenta — cycles per index

const statusStyles: Record<Game["status"], { color: string; border: string; label: string }> = {
  "live":      { color: "#8aa091", border: "#2a3a30", label: "● live" },
  "in-trials": { color: "#ffd166", border: "#4a3a18", label: "◐ in trials" },
  "original":  { color: "#c8a3ff", border: "#3a2a4a", label: "◆ original" },
  "brewing":   { color: "#8aa091", border: "#2a3a30", label: "○ brewing" },
};

function tapeBg(variant: TapeVariant): string {
  return {
    yellow: "rgba(245, 222, 130, 0.94)",
    cream: "rgba(255, 230, 160, 0.94)",
    blue: "rgba(180, 200, 245, 0.94)",
    orange: "rgba(255, 140, 100, 0.94)",
  }[variant];
}

export function GameCard({ game, index = 0 }: GameCardProps) {
  const status = statusStyles[game.status];
  const tapeRot = tapeRotation[index % tapeRotation.length];
  const tapeSide = tapePosition[index % tapePosition.length];

  return (
    <Box
      sx={{
        position: "relative",
        background: "surface.tile",
        borderRadius: "8px",
        overflow: "visible",
        boxShadow: "0 12px 32px rgba(0,0,0,0.45)",
        border: "1px solid #1f2a23",
        display: "flex",
        flexDirection: "column",
        transform: `rotate(${(index % 2 === 0 ? -1 : 1) * (0.7 + (index * 0.1))}deg)`,
        transition: "transform 0.2s ease",
        "&:hover": { transform: "rotate(0deg) translateY(-4px)" },
        "@media (prefers-reduced-motion: reduce)": {
          transform: "none",
          "&:hover": { transform: "none" },
        },
      }}
    >
      {/* tape label */}
      <Box
        sx={{
          position: "absolute",
          top: -10,
          [tapeSide]: 24,
          background: tapeBg(game.tapeVariant),
          color: game.tapeVariant === "blue" ? "#0e1a30" : "#2a2010",
          fontFamily: '"Space Grotesk", "Inter", sans-serif',
          fontSize: 10,
          fontWeight: 600,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          padding: "4px 11px",
          transform: `rotate(${tapeRot}deg)`,
          boxShadow: "0 2px 6px rgba(0,0,0,0.4)",
          zIndex: 2,
        }}
      >
        Spec. №{game.specimen}
      </Box>

      {/* image */}
      <Box sx={{ aspectRatio: "1200 / 630", background: "#000", overflow: "hidden", borderRadius: "7px 7px 0 0" }}>
        <Box
          component="img"
          src={game.ogImage}
          alt={game.name}
          sx={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
      </Box>

      {/* body */}
      <Box sx={{ padding: "18px 20px", display: "flex", flexDirection: "column", gap: 1, flex: 1 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 1.5 }}>
          <Typography variant="h3" sx={{ fontSize: 26, lineHeight: 1, color: "text.primary", m: 0 }}>
            {game.name}
          </Typography>
          {game.note && (
            <Box
              aria-hidden="true"
              sx={{
                fontFamily: '"Caveat", cursive',
                color: noteColors[index % noteColors.length],
                fontSize: 18,
                lineHeight: 1.05,
                whiteSpace: "nowrap",
                transform: `rotate(${index % 2 === 0 ? -3 : 3}deg)`,
                flexShrink: 0,
              }}
            >
              {game.note}
            </Box>
          )}
        </Box>
        {game.inspiration && (
          <Box sx={{ fontFamily: '"Space Grotesk", "Inter", sans-serif', fontSize: 10.5, color: "text.disabled", letterSpacing: "0.04em" }}>
            ↳ {game.inspiration}
          </Box>
        )}
        <Typography sx={{ fontSize: 13.5, lineHeight: 1.5, color: "text.secondary", margin: "4px 0 12px" }}>
          {game.description}
        </Typography>

        {/* footer */}
        <Box
          sx={{
            mt: "auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 1,
            paddingTop: 1.5,
            borderTop: "1px dashed #2a3a30",
            fontFamily: '"Space Grotesk", "Inter", sans-serif',
            fontSize: 10,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "text.disabled",
          }}
        >
          <Box sx={{ display: "flex", gap: 1.25, alignItems: "center" }}>
            <Box component="span">{game.players} players</Box>
            <Box
              sx={{
                border: `1px solid ${status.border}`,
                borderRadius: "99px",
                padding: "2px 8px",
                color: status.color,
              }}
            >
              {status.label}
            </Box>
          </Box>
          <Box sx={{ display: "flex", gap: 1.5 }}>
            <Link href={game.repoUrl} target="_blank" rel="noopener noreferrer" sx={{ color: "accent.magenta", textDecoration: "none", fontWeight: 600 }}>
              code ↗
            </Link>
            <Link href={game.url} target="_blank" rel="noopener noreferrer" sx={{ color: "accent.acid", textDecoration: "none", fontWeight: 600 }}>
              play ↗
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
