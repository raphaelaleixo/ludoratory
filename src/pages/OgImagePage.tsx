import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import siteContent from "../content/site.json";
import type { SiteContent } from "../types";
import { Ludoratory } from "../components/Ludoratory";

const content = siteContent as SiteContent;

const OG_WIDTH = 1200;
const OG_HEIGHT = 630;

function HeadlineLine({ line, glowToken }: { line: string; glowToken: string }) {
  if (!line.includes(glowToken)) return <>{line}</>;
  const [before, after] = line.split(glowToken);
  return (
    <>
      {before}
      <Box
        component="span"
        sx={{
          background: "linear-gradient(180deg, #aaffe0 0%, #4fd6b0 100%)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          color: "transparent",
          textShadow: "0 0 24px rgba(127, 255, 212, 0.4)",
          display: "inline-block",
        }}
      >
        {glowToken}
      </Box>
      {after}
    </>
  );
}

export default function OgImagePage() {
  const { name, headline, headlineGlowToken } = content.site;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#000",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        p: 0,
      }}
    >
      {/* the OG image canvas — exactly 1200x630 from border to border */}
      <Box
        id="og-image"
        sx={{
          width: OG_WIDTH,
          height: OG_HEIGHT,
          position: "relative",
          overflow: "hidden",
          bgcolor: "surface.base",
          color: "text.primary",
          fontFamily: '"DM Sans", system-ui, sans-serif',
        }}
      >
        {/* grid frame — same treatment as the homepage, but scaled to fit the canvas */}
        <Box
          aria-hidden
          sx={{
            position: "absolute",
            inset: 32,
            border: "1px solid #1f2a2a",
            borderRadius: "8px",
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), " +
              "linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* content */}
        <Box
          sx={{
            position: "absolute",
            inset: 32,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: 5,
            }}
          >
            {/* logo bar */}
            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 1.25,
                color: "accent.acid",
              }}
            >
              <Ludoratory size={52} />
              <Box
                component="span"
                sx={{
                  fontFamily: '"Space Grotesk", "DM Sans", sans-serif',
                  fontWeight: 700,
                  fontSize: 26,
                  letterSpacing: "0.04em",
                }}
              >
                {name.toUpperCase()}
              </Box>
            </Box>

            {/* headline */}
            <Typography
              variant="h1"
              component="h1"
              sx={{
                fontSize: 80,
                lineHeight: 0.95,
                color: "text.primary",
                m: 0,
              }}
            >
              {headline.map((line, i) => (
                <Box component="span" key={i} sx={{ display: "block" }}>
                  <HeadlineLine line={line} glowToken={headlineGlowToken} />
                </Box>
              ))}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
