import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import type { FooterLink } from "../types";

interface SiteFootProps {
  email: string;
  links: FooterLink[];
}

export function SiteFoot({ email, links }: SiteFootProps) {
  return (
    <Box
      component="footer"
      sx={{
        marginTop: "36px",
        paddingTop: "20px",
        borderTop: "1px dashed #2a3a30",
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 2,
        fontFamily: '"Space Grotesk", "DM Sans", sans-serif',
        fontSize: 16,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color: "#6a7a6f",
      }}
    >
      <Link href={`mailto:${email}`} sx={{ color: "inherit", textDecoration: "none", "&:hover": { color: "accent.acid" } }}>
        {email}
      </Link>
      <Box sx={{ display: "flex", gap: 1.5 }}>
        {links.map((l, i) => (
          <Box component="span" key={l.label} sx={{ display: "inline-flex", gap: 1.5 }}>
            {i > 0 && <Box component="span">·</Box>}
            <Link
              href={l.url}
              target="_blank"
              rel="noopener noreferrer"
              sx={{ color: "inherit", textDecoration: "none", "&:hover": { color: "accent.acid" } }}
            >
              {l.label}
            </Link>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
