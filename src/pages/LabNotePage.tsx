import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { Link as RouterLink, useParams } from "react-router-dom";
import { LabNotesShell } from "../components/LabNotesShell";
import { getPostBySlug } from "../lib/labNotes";

function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-");
  return new Date(Number(y), Number(m) - 1, Number(d)).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function LabNotePage() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;

  return (
    <LabNotesShell>
      <Box sx={{ maxWidth: 720, mx: "auto" }}>
        {post ? (
          <>
            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 0.5,
                fontFamily: '"Space Grotesk", "DM Sans", sans-serif',
                fontSize: 12,
                color: "text.disabled",
                letterSpacing: "0.04em",
                mb: 1,
              }}
            >
              <Box component="span" sx={{ lineHeight: 1, transform: "translateY(2px)" }}>↱</Box>
              <Box component="span">{formatDate(post.date)}</Box>
            </Box>
            <Box component="article">
              <post.Component />
            </Box>
          </>
        ) : (
          <Box>
            <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
              Not found
            </Typography>
            <Typography variant="body1" sx={{ color: "text.secondary" }}>
              No note matches that URL.{" "}
              <Link component={RouterLink} to="/lab-notes">
                Back to lab notes
              </Link>
              .
            </Typography>
          </Box>
        )}
      </Box>
    </LabNotesShell>
  );
}
