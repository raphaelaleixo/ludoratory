import Box from "@mui/material/Box";
import siteContent from "../content/site.json";
import type { SiteContent, Section, SectionId } from "../types";
import { Hero } from "../components/Hero";
import { SpecimenCatalog } from "../components/SpecimenCatalog";
import { LabOriginals } from "../components/LabOriginals";
import { ApparatusSection } from "../components/ApparatusSection";
import { HouseRules } from "../components/HouseRules";
import { SiteFoot } from "../components/SiteFoot";
// import { Smoke } from "../components/effects/Smoke";

const content = siteContent as SiteContent;
const adaptedGames = content.games.filter((g) => g.status !== "original");
const originalGames = content.games.filter((g) => g.status === "original");

const sectionsById = Object.fromEntries(
  content.sections.map((s) => [s.id, s]),
) as Record<SectionId, Section>;

export default function HomePage() {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "surface.base", py: { xs: 3, md: 5 }, px: { xs: 2, md: 4 } }}>
      <Box
        sx={{
          maxWidth: 1100,
          mx: "auto",
          padding: { xs: "24px", md: "36px 38px 44px" },
          background:
            "radial-gradient(ellipse at 20% 0%, rgba(163, 255, 92, 0.10), transparent 50%), " +
            "radial-gradient(ellipse at 90% 60%, rgba(255, 77, 141, 0.10), transparent 50%), #0a140a",
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), " +
            "linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          color: "text.primary",
          fontFamily: '"DM Sans", system-ui, sans-serif',
          position: "relative",
        }}
      >
        <Hero site={content.site} />
        <SpecimenCatalog
          games={adaptedGames}
          label={sectionsById.specimenCatalog.label}
          note={sectionsById.specimenCatalog.note}
        />
        <LabOriginals
          games={originalGames}
          label={sectionsById.labOriginals.label}
          note={sectionsById.labOriginals.note}
        />
        <ApparatusSection
          apparatus={content.apparatus}
          label={sectionsById.apparatus.label}
          note={sectionsById.apparatus.note}
        />
        <HouseRules
          rules={content.houseRules}
          label={sectionsById.houseRules.label}
          note={sectionsById.houseRules.note}
        />
        <SiteFoot links={content.footer.links} license={content.footer.license} />
      </Box>
      {/* <Smoke /> */}
    </Box>
  );
}
