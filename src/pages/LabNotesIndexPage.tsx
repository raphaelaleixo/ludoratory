import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { Link as RouterLink } from "react-router-dom";
import { LabNotesShell } from "../components/LabNotesShell";
import { NumberBadge } from "../components/NumberBadge";
import { posts } from "../lib/labNotes";

function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-");
  return new Date(Number(y), Number(m) - 1, Number(d)).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function LabNotesIndexPage() {
  return (
    <LabNotesShell>
      <Box sx={{ maxWidth: 720, mx: "auto" }}>
        <Box component="header" sx={{ mb: { xs: 4, md: 6 } }}>
          <Typography variant="h2" component="h1">
            Lab notes
          </Typography>
        </Box>
        {posts.length === 0 ? (
          <Typography variant="body1" sx={{ color: "text.secondary" }}>
            No notes yet.
          </Typography>
        ) : (
          <Stack component="ul" sx={{ listStyle: "none", p: 0, m: 0 }} spacing={3}>
            {posts.map((p, i) => {
              const number = String(posts.length - i).padStart(2, "0");
              return (
                <Box
                  component="li"
                  key={p.slug}
                  sx={{ display: "flex", gap: 1.5, alignItems: "flex-start" }}
                >
                  <NumberBadge>{number}</NumberBadge>
                  <Box>
                    <Link
                      component={RouterLink}
                      to={`/lab-notes/${p.slug}`}
                      underline="hover"
                      sx={{ color: "text.primary", display: "block" }}
                    >
                      <Typography
                        variant="h5"
                        component="h2"
                        sx={{
                          mb: 0.5,
                          fontFamily: '"Space Grotesk", "DM Sans", sans-serif',
                          fontWeight: 700,
                          letterSpacing: "-0.015em",
                        }}
                      >
                        {p.title}
                      </Typography>
                    </Link>
                    <Box
                      sx={{
                        fontFamily: '"Space Grotesk", "DM Sans", sans-serif',
                        fontSize: 12,
                        color: "text.disabled",
                        letterSpacing: "0.04em",
                      }}
                    >
                      ↳ {formatDate(p.date)}
                    </Box>
                  </Box>
                </Box>
              );
            })}
          </Stack>
        )}
      </Box>
    </LabNotesShell>
  );
}
