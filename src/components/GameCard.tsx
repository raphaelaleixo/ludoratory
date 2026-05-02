import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import type { Game } from "../types";

interface GameCardProps {
  game: Game;
  /** Even-indexed (0, 2 — left column) cards tilt left; odd tilt right. */
  index?: number;
}

const noteColors = ["#7fffd4", "#ffd166", "#ff9bbd"]; // acid, amber, magenta — cycles per index

export function GameCard({ game, index = 0 }: GameCardProps) {
  return (
    <Box
      sx={{
        position: "relative",
        bgcolor: "surface.tile",
        borderRadius: "8px",
        overflow: "visible",
        boxShadow: "0 12px 32px rgba(0,0,0,0.45)",
        border: "1px solid #1f2a2a",
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
      {/* content area — entire image + body is the play link */}
      <Link
        href={game.url}
        target="_blank"
        rel="noopener noreferrer"
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          color: "inherit",
          textDecoration: "none",
          borderRadius: "7px 7px 0 0",
          "& .game-card-img": {
            transition: "transform 0.4s ease, filter 0.4s ease",
          },
          "& .game-card-overlay": {
            opacity: 0,
            transition: "opacity 0.25s ease",
          },
          "& .game-card-overlay-chip": {
            transform: "translateY(8px)",
            transition: "transform 0.25s ease",
          },
          "&:hover .game-card-img, &:focus-visible .game-card-img": {
            transform: "scale(1.04)",
            filter: "brightness(1.08)",
          },
          "&:hover .game-card-overlay, &:focus-visible .game-card-overlay": {
            opacity: 1,
          },
          "&:hover .game-card-overlay-chip, &:focus-visible .game-card-overlay-chip": {
            transform: "translateY(0)",
          },
          "@media (prefers-reduced-motion: reduce)": {
            "&:hover .game-card-img, &:focus-visible .game-card-img": { transform: "none" },
            "&:hover .game-card-overlay-chip, &:focus-visible .game-card-overlay-chip": {
              transform: "none",
            },
          },
        }}
      >
        {/* image with Play now overlay */}
        <Box
          sx={{
            display: "block",
            aspectRatio: "1200 / 630",
            background: "#000",
            overflow: "hidden",
            borderRadius: "7px 7px 0 0",
            position: "relative",
          }}
        >
          <Box
            component="picture"
            className="game-card-img"
            sx={{
              display: "block",
              width: "100%",
              height: "100%",
            }}
          >
            <source srcSet={game.ogImage.replace(/\.png$/, ".webp")} type="image/webp" />
            <Box
              component="img"
              src={game.ogImage}
              alt={game.name}
              loading="lazy"
              decoding="async"
              sx={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </Box>
          <Box
            className="game-card-overlay"
            aria-hidden="true"
            sx={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(2, 6, 6, 0.55)",
              pointerEvents: "none",
              zIndex: 2,
            }}
          >
            <Box
              className="game-card-overlay-chip"
              sx={{
                bgcolor: "accent.acid",
                color: "#020606",
                fontFamily: '"Space Grotesk", "DM Sans", sans-serif',
                fontWeight: 700,
                fontSize: 14,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                padding: "10px 18px",
                borderRadius: "4px",
                boxShadow: "0 4px 16px rgba(0,0,0,0.4)",
              }}
            >
              Play now ↗
            </Box>
          </Box>
        </Box>

        {/* body */}
        <Box sx={{ padding: "18px 20px 16px", display: "flex", flexDirection: "column", gap: 1, flex: 1 }}>
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
                  fontSize: 24,
                  lineHeight: 1,
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
            <Box sx={{ fontFamily: '"Space Grotesk", "DM Sans", sans-serif', fontSize: 12, color: "text.disabled", letterSpacing: "0.04em" }}>
              ↳ {game.inspiration}
            </Box>
          )}
          <Typography sx={{ fontSize: 16, lineHeight: 1.5, color: "text.secondary", margin: "4px 0 0" }}>
            {game.description}
          </Typography>
        </Box>
      </Link>

      {/* footer (separated from content) */}
      <Box
        sx={{
          padding: "12px 20px 16px",
          borderTop: "1px dashed #2a3a3a",
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
          justifyContent: { xs: "flex-start", lg: "space-between" },
          alignItems: { xs: "flex-start", lg: "center" },
          gap: 1,
          fontFamily: '"Space Grotesk", "DM Sans", sans-serif',
          fontSize: 12,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "text.secondary",
        }}
      >
        <Box component="span">{game.players}</Box>
        <Link
          href={game.repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            color: "accent.magenta",
            fontSize: 14,
            textDecoration: "none",
            fontWeight: 600,
            transition: "filter 0.2s ease",
            "& .arrow": { display: "inline-block", transition: "transform 0.2s ease" },
            "&:hover": { filter: "brightness(1.15)" },
            "&:hover .arrow": { transform: "translate(2px, -2px)" },
          }}
        >
          code <Box component="span" className="arrow">↗</Box>
        </Link>
      </Box>
    </Box>
  );
}
