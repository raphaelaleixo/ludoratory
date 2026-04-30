import Box from "@mui/material/Box";
import type { Game } from "../types";
import { GameCard } from "./GameCard";
import { SectionLabel } from "./SectionLabel";
import { SectionNote } from "./SectionNote";

interface LabOriginalsProps {
  games: Game[];
  label: string;
  note?: string;
}

export function LabOriginals({ games, label, note }: LabOriginalsProps) {
  if (games.length === 0) return null;

  return (
    <Box sx={{ position: "relative" }}>
      <SectionLabel>{label}</SectionLabel>
      {note && <SectionNote text={note} color="gray" rotate={-2} />}
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
