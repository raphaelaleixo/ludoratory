import Box from "@mui/material/Box";
import type { ComponentProps } from "react";
import type { ScribbleColor } from "../types";

interface MarginScribbleProps {
  text: string;
  color?: ScribbleColor;
  rotate?: number;
  fontSize?: number;
  sx?: ComponentProps<typeof Box>["sx"];
}

const colorMap: Record<ScribbleColor, string> = {
  acid: "#a3ff5c",
  amber: "#ffd166",
  magenta: "#ff9bbd",
};

export function MarginScribble({
  text,
  color = "acid",
  rotate = -3,
  fontSize = 20,
  sx,
}: MarginScribbleProps) {
  return (
    <Box
      aria-hidden="true"
      sx={{
        fontFamily: '"Caveat", cursive',
        color: colorMap[color],
        position: "absolute",
        pointerEvents: "none",
        lineHeight: 1.05,
        whiteSpace: "nowrap",
        transform: `rotate(${rotate}deg)`,
        fontSize: `${fontSize}px`,
        ...sx,
      }}
    >
      {text}
    </Box>
  );
}
