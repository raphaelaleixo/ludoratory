import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import type { HouseRule } from "../types";
import { SectionLabel } from "./SectionLabel";
import { SectionNote } from "./SectionNote";

interface HouseRulesProps {
  rules: HouseRule[];
  label: string;
  note?: string;
}

export function HouseRules({ rules, label, note }: HouseRulesProps) {
  return (
    <Box sx={{ position: "relative" }}>
      <SectionLabel>{label}</SectionLabel>
      {note && <SectionNote text={note} color="violet" rotate={-1.25} />}
      <Box
        sx={{
          bgcolor: "surface.rules",
          border: "1px solid #2a3a3a",
          borderRadius: "8px",
          padding: "28px 30px 24px",
          position: "relative",
        }}
      >
        <Typography variant="h2" component="h3" sx={{ fontSize: 26, m: 0, mb: 2.5, color: "text.primary" }}>
          The fine print, kept short.
        </Typography>

        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: "16px 24px" }}>
          {rules.map((r) => (
            <Box key={r.number} sx={{ display: "flex", gap: 1.5, alignItems: "flex-start" }}>
              <Box
                sx={{
                  fontFamily: '"Space Grotesk", "DM Sans", sans-serif',
                  fontSize: 16,
                  fontWeight: 600,
                  fontVariantNumeric: "tabular-nums",
                  color: "accent.acid",
                  border: "1px solid #2a4a44",
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
