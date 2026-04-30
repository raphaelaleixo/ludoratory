import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import type { Apparatus } from "../types";
import { SectionLabel } from "./SectionLabel";
import { SectionNote } from "./SectionNote";

interface ApparatusSectionProps {
  apparatus: Apparatus;
  label: string;
  note?: string;
}

export function ApparatusSection({ apparatus, label, note }: ApparatusSectionProps) {
  return (
    <Box sx={{ position: "relative" }}>
      <SectionLabel>{label}</SectionLabel>
      {note && <SectionNote text={note} color="amber" rotate={-1} />}
      <Box
        sx={{
          bgcolor: "surface.apparatus",
          border: "1px solid #1d3a3a",
          borderRadius: "8px",
          padding: "24px 28px",
          position: "relative",
          overflow: "visible",
          "&::before": {
            content: '""',
            position: "absolute",
            inset: 0,
            backgroundImage: "repeating-linear-gradient(45deg, rgba(127,255,212,0.09) 0 2px, transparent 2px 8px)",
            pointerEvents: "none",
            borderRadius: "8px",
          },
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: -10,
            left: 32,
            bgcolor: "tape.orange",
            color: "#2a1410",
            fontFamily: '"Space Grotesk", "DM Sans", sans-serif',
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            padding: "4px 11px",
            transform: "rotate(-2deg)",
            boxShadow: "0 2px 6px rgba(0,0,0,0.4)",
            zIndex: 2,
          }}
        >
          Tool · open source
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr auto" },
            gap: "24px",
            alignItems: "center",
            position: "relative",
          }}
        >
          <Box>
            <Typography variant="h3" sx={{ fontSize: 32, lineHeight: 1, color: "text.primary", m: 0, mb: 0.75 }}>
              {apparatus.name}
              <Box
                component="span"
                sx={{
                  fontFamily: '"Space Grotesk", "DM Sans", sans-serif',
                  fontSize: 16,
                  fontWeight: 500,
                  color: "accent.acid",
                  ml: 1.25,
                  border: "1px solid #2a3a3a",
                  borderRadius: "4px",
                  padding: "1px 6px",
                  verticalAlign: "middle",
                }}
              >
                v{apparatus.version}
              </Box>
            </Typography>
            <Typography sx={{ fontSize: 16, lineHeight: 1.55, color: "text.secondary", maxWidth: 480, m: 0 }}>
              {apparatus.description}
            </Typography>
          </Box>

          <Box
            sx={{
              fontFamily: '"Space Grotesk", "DM Sans", sans-serif',
              fontSize: 16,
              color: "accent.acid",
              background: "#060a0a",
              border: "1px solid #1d2a2a",
              borderRadius: "4px",
              padding: "6px 10px",
              display: "inline-block",
              justifySelf: { xs: "flex-start", md: "flex-end" },
            }}
          >
            {apparatus.installSnippet}
          </Box>
        </Box>

        <Box
          sx={{
            mt: 2,
            paddingTop: 1.5,
            borderTop: "1px dashed #2a3a3a",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 1.5,
            fontFamily: '"Space Grotesk", "DM Sans", sans-serif',
            fontSize: 12,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "text.secondary",
            position: "relative",
          }}
        >
          <Box component="span" sx={{ color: "text.disabled" }}>
            {apparatus.license} licensed
          </Box>
          <Box sx={{ display: "flex", gap: 1.5 }}>
            <Link
              href={apparatus.repoUrl}
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
            <Link
              href={apparatus.docsUrl}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: "accent.amber",
                fontSize: 14,
                textDecoration: "none",
                fontWeight: 600,
                transition: "filter 0.2s ease",
                "& .arrow": { display: "inline-block", transition: "transform 0.2s ease" },
                "&:hover": { filter: "brightness(1.15)" },
                "&:hover .arrow": { transform: "translate(2px, -2px)" },
              }}
            >
              docs <Box component="span" className="arrow">↗</Box>
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
