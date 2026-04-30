import Box from "@mui/material/Box";
import type { ReactNode } from "react";
import type { Game } from "../types";
import { GameCard } from "./GameCard";

interface LabOriginalsProps {
  games: Game[];
}

export function LabOriginals({ games }: LabOriginalsProps) {
  if (games.length === 0) return null;

  return (
    <Box sx={{ position: "relative" }}>
      <SectionLabel>Lab Originals</SectionLabel>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          columnGap: { xs: 0, md: "56px" },
          rowGap: "28px",
        }}
      >
        {games.map((game, i) => (
          <GameCard key={game.id} game={game} index={i} />
        ))}
      </Box>
    </Box>
  );
}

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <Box
      sx={{
        fontFamily: '"IBM Plex Mono", monospace',
        fontSize: 10,
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        color: "text.disabled",
        margin: "36px 0 18px",
        display: "flex",
        alignItems: "center",
        gap: "10px",
        "&::after": {
          content: '""',
          flex: 1,
          height: "1px",
          background: "repeating-linear-gradient(90deg, #2a3a30 0 4px, transparent 4px 8px)",
        },
      }}
    >
      {children}
    </Box>
  );
}
