import Box from "@mui/material/Box";
import type { ReactNode } from "react";

interface SectionLabelProps {
  children: ReactNode;
}

export function SectionLabel({ children }: SectionLabelProps) {
  return (
    <Box
      sx={{
        fontFamily: '"Space Grotesk", "DM Sans", sans-serif',
        fontSize: 12,
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        color: "text.primary",
        margin: "36px 0 28px",
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
