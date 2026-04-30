import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import type { ReactNode } from "react";
import type { HouseRule } from "../types";

interface HouseRulesProps {
  rules: HouseRule[];
}

export function HouseRules({ rules }: HouseRulesProps) {
  return (
    <Box sx={{ position: "relative" }}>
      <SectionLabel>House Rules</SectionLabel>
      <Box
        sx={{
          background: "surface.rules",
          border: "1px solid #2a3a30",
          borderRadius: "8px",
          padding: "28px 30px 24px",
          position: "relative",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: -10,
            right: 36,
            background: "tape.yellow",
            color: "#2a2010",
            fontFamily: '"Space Grotesk", "DM Sans", sans-serif',
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            padding: "4px 11px",
            transform: "rotate(2deg)",
            boxShadow: "0 2px 6px rgba(0,0,0,0.4)",
            zIndex: 2,
          }}
        >
          Lab Notice
        </Box>

        <Typography variant="h2" sx={{ fontSize: 26, m: 0, mb: 0.75, color: "text.primary" }}>
          The fine print, kept short.
        </Typography>
        <Box sx={{ fontFamily: '"Caveat", cursive', fontSize: 24, lineHeight: 1, color: "text.disabled", maxWidth: 520, m: 0, mb: 2.5 }}>
          how this place actually works ↓
        </Box>

        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: "16px 24px" }}>
          {rules.map((r) => (
            <Box key={r.number} sx={{ display: "flex", gap: 1.5, alignItems: "flex-start" }}>
              <Box
                sx={{
                  fontFamily: '"Space Grotesk", "DM Sans", sans-serif',
                  fontSize: 16,
                  fontWeight: 600,
                  color: "accent.acid",
                  border: "1px solid #2a4a3a",
                  borderRadius: "4px",
                  padding: "2px 6px",
                  minWidth: 26,
                  textAlign: "center",
                  flexShrink: 0,
                  mt: "2px",
                }}
              >
                {r.number}
              </Box>
              <Box>
                <Box
                  component="h4"
                  sx={{ fontSize: 16, fontWeight: 700, color: "text.primary", m: 0, mb: 0.25, fontFamily: '"DM Sans", system-ui, sans-serif' }}
                >
                  {r.title}
                </Box>
                <Typography sx={{ fontSize: 16, lineHeight: 1.5, color: "text.disabled", m: 0 }}>
                  {r.description}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <Box
      sx={{
        fontFamily: '"Space Grotesk", "DM Sans", sans-serif',
        fontSize: 12,
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        color: "text.secondary",
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
