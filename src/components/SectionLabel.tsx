import Box from "@mui/material/Box";
import type { ReactNode } from "react";

interface SectionLabelProps {
  children: ReactNode;
}

export function SectionLabel({ children }: SectionLabelProps) {
  return (
    <Box
      component="h2"
      sx={{
        fontFamily: '"Space Grotesk", "DM Sans", sans-serif',
        fontSize: 12,
        fontWeight: 600,
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        color: "accent.acid",
        margin: "36px 0 28px",
        display: "flex",
        alignItems: "center",
        gap: "10px",
        counterIncrement: "section",
        "&::before": {
          content: 'counter(section, upper-alpha) ")"',
          fontVariantNumeric: "tabular-nums",
          opacity: 0.85,
        },
        "&::after": {
          content: '""',
          flex: 1,
          height: "1px",
          background: "rgba(127,255,212,0.35)",
        },
      }}
    >
      {children}
    </Box>
  );
}
