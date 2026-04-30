import Box from "@mui/material/Box";
import type { ScribbleColor } from "../types";

interface SectionNoteProps {
  text: string;
  color?: ScribbleColor;
  rotate?: number;
}

const colorMap: Record<ScribbleColor, string> = {
  acid: "accent.acid",
  amber: "accent.amber",
  magenta: "accent.magenta",
};

export function SectionNote({ text, color = "magenta", rotate = -1.5 }: SectionNoteProps) {
  return (
    <Box
      sx={{
        fontFamily: '"Caveat", cursive',
        fontSize: 24,
        lineHeight: 1,
        color: colorMap[color],
        transform: `rotate(${rotate}deg)`,
        display: "inline-block",
        mt: -1,
        mb: 4,
      }}
    >
      {text}
    </Box>
  );
}
