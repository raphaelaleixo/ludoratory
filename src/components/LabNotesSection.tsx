import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { Link as RouterLink } from "react-router-dom";
import { SectionLabel } from "./SectionLabel";
import { SectionNote } from "./SectionNote";
import { posts } from "../lib/labNotes";

interface LabNotesSectionProps {
  label: string;
  note?: string;
  limit?: number;
}

function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-");
  return new Date(Number(y), Number(m) - 1, Number(d)).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function LabNotesSection({ label, note, limit = 3 }: LabNotesSectionProps) {
  if (posts.length === 0) return null;
  const recent = posts.slice(0, limit);
  const hasMore = posts.length > limit;

  return (
    <Box sx={{ position: "relative" }}>
      <SectionLabel>{label}</SectionLabel>
      {note && <SectionNote text={note} color="amber" rotate={1.25} />}
      <Box
        sx={{
          bgcolor: "surface.rules",
          border: "1px solid #2a3a3a",
          borderRadius: "8px",
          padding: "12px 24px",
        }}
      >
        <Box component="ul" sx={{ listStyle: "none", p: 0, m: 0 }}>
          {recent.map((p, i) => (
            <Box
              component="li"
              key={p.slug}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                gap: 2,
                py: 1.5,
                borderTop: i === 0 ? "none" : "1px solid",
                borderColor: "rgba(127, 255, 212, 0.08)",
              }}
            >
              <Link
                component={RouterLink}
                to={`/lab-notes/${p.slug}`}
                underline="hover"
                sx={{ color: "text.primary", fontSize: 16, fontWeight: 700 }}
              >
                {p.title}
              </Link>
              <Typography
                component="span"
                sx={{
                  color: "text.disabled",
                  fontSize: 12,
                  letterSpacing: "0.05em",
                  flexShrink: 0,
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {formatDate(p.date)}
              </Typography>
            </Box>
          ))}
        </Box>
        <Box sx={{ mt: 1.5, pt: 1.5, borderTop: "1px solid", borderColor: "rgba(127, 255, 212, 0.12)" }}>
          <Link
            component={RouterLink}
            to="/lab-notes"
            underline="hover"
            sx={{
              color: "accent.acid",
              fontSize: 12,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              fontWeight: 600,
            }}
          >
            {hasMore ? "All notes →" : "Open lab notes →"}
          </Link>
        </Box>
      </Box>
    </Box>
  );
}
