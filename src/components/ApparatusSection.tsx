import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import type { ReactNode } from "react";
import type { Apparatus } from "../types";

interface ApparatusSectionProps {
  apparatus: Apparatus;
}

export function ApparatusSection({ apparatus }: ApparatusSectionProps) {
  return (
    <Box sx={{ position: "relative" }}>
      <SectionLabel>The Apparatus</SectionLabel>
      <Box
        sx={{
          background: "surface.apparatus",
          border: "1px solid #1d3a2f",
          borderRadius: "8px",
          padding: "24px 28px",
          position: "relative",
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr auto" },
          gap: "24px",
          alignItems: "center",
          overflow: "visible",
          "&::before": {
            content: '""',
            position: "absolute",
            inset: 0,
            backgroundImage: "repeating-linear-gradient(45deg, rgba(163,255,92,0.025) 0 2px, transparent 2px 8px)",
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
            background: "tape.orange",
            color: "#2a1410",
            fontFamily: '"IBM Plex Mono", monospace',
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            padding: "4px 11px",
            transform: "rotate(-2deg)",
            boxShadow: "0 2px 6px rgba(0,0,0,0.4)",
            zIndex: 2,
          }}
        >
          Tool · OSS
        </Box>

        <Box sx={{ position: "relative" }}>
          <Typography variant="h3" sx={{ fontSize: 32, lineHeight: 1, color: "text.primary", m: 0, mb: 0.75 }}>
            {apparatus.name}
            <Box
              component="span"
              sx={{
                fontFamily: '"IBM Plex Mono", monospace',
                fontSize: 12,
                fontWeight: 500,
                color: "accent.acid",
                ml: 1.25,
                border: "1px solid #2a3a30",
                borderRadius: "4px",
                padding: "1px 6px",
                verticalAlign: "middle",
              }}
            >
              v{apparatus.version}
            </Box>
          </Typography>
          <Typography sx={{ fontSize: 13.5, lineHeight: 1.55, color: "text.secondary", maxWidth: 480, m: 0, mb: 1.5 }}>
            {apparatus.description}
          </Typography>
          <Box
            sx={{
              fontFamily: '"IBM Plex Mono", monospace',
              fontSize: 11.5,
              color: "accent.acid",
              background: "#060a08",
              border: "1px solid #1d2a23",
              borderRadius: "4px",
              padding: "6px 10px",
              display: "inline-block",
            }}
          >
            {apparatus.installSnippet}
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            alignItems: { xs: "flex-start", md: "flex-end" },
            fontFamily: '"IBM Plex Mono", monospace',
            fontSize: 10.5,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            position: "relative",
          }}
        >
          <Link
            href={apparatus.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            sx={{ color: "accent.acid", textDecoration: "none", fontWeight: 600, border: "1px solid #2a4a3a", borderRadius: "4px", padding: "6px 12px" }}
          >
            github ↗
          </Link>
          <Link
            href={apparatus.docsUrl}
            target="_blank"
            rel="noopener noreferrer"
            sx={{ color: "accent.amber", textDecoration: "none", fontWeight: 600, border: "1px solid #4a3a18", borderRadius: "4px", padding: "6px 12px" }}
          >
            docs ↗
          </Link>
          <Box component="span" sx={{ color: "#6a7a6f", fontSize: 9 }}>
            {apparatus.license} licensed
          </Box>
        </Box>
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
