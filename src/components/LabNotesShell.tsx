import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import { Link as RouterLink } from "react-router-dom";
import type { ReactNode } from "react";
import siteContent from "../content/site.json";
import type { SiteContent } from "../types";
import { Ludoratory } from "./Ludoratory";
import { SiteFoot } from "./SiteFoot";

const content = siteContent as SiteContent;

interface LabNotesShellProps {
  children: ReactNode;
}

export function LabNotesShell({ children }: LabNotesShellProps) {
  const { name, attribution } = content.site;
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "surface.base",
        py: { xs: 3, md: 5 },
        px: { xs: 2, md: 4 },
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        aria-hidden
        sx={{
          position: "fixed",
          inset: 0,
          py: { xs: 3, md: 5 },
          px: { xs: 2, md: 4 },
          pointerEvents: "none",
          zIndex: 0,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: 1100,
            border: "1px solid #1f2a2a",
            borderRadius: "8px",
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), " +
              "linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
            backgroundAttachment: "fixed",
          }}
        />
      </Box>
      <Box
        sx={{
          width: "100%",
          maxWidth: 1100,
          mx: "auto",
          padding: { xs: "24px", md: "36px 38px 44px" },
          color: "text.primary",
          fontFamily: '"DM Sans", system-ui, sans-serif',
          position: "relative",
          zIndex: 1,
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: { xs: "flex-start", md: "space-between" },
            alignItems: { xs: "flex-start", md: "center" },
            gap: { xs: 0.75, md: 0 },
            fontFamily: '"Space Grotesk", "DM Sans", sans-serif',
            fontSize: "12px",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "text.secondary",
            mb: { xs: 4, md: 6 },
          }}
        >
          <Link
            component={RouterLink}
            to="/"
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 1,
              color: "accent.acid",
              textDecoration: "none",
              "&:hover": { opacity: 0.85 },
            }}
          >
            <Ludoratory size={36} />
            <Box
              component="span"
              sx={{
                fontFamily: '"Space Grotesk", "DM Sans", sans-serif',
                fontWeight: 700,
                fontSize: 18,
                letterSpacing: "0.04em",
              }}
            >
              {name.toUpperCase()}
            </Box>
          </Link>
          <Link
            href={attribution.url}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: "text.secondary",
              fontWeight: 400,
              textDecoration: "none",
              "&:hover": { textDecoration: "underline" },
            }}
          >
            by {attribution.name} ↗
          </Link>
        </Box>
        <Box component="main" sx={{ flex: 1 }}>{children}</Box>
        <SiteFoot links={content.footer.links} license={content.footer.license} />
      </Box>
    </Box>
  );
}
