import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import { MemoryRouter } from "react-router-dom";
import theme from "../src/theme/theme";
import HomePage from "../src/pages/HomePage";
import siteContent from "../src/content/site.json";

function renderHome() {
  return render(
    <ThemeProvider theme={theme}>
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    </ThemeProvider>,
  );
}

describe("HomePage", () => {
  it("renders the headline tokens", () => {
    renderHome();
    expect(screen.getByText(/From Experiment/i)).toBeInTheDocument();
    // Read the glow token from the content rather than restating it, so the
    // assertion follows the copy instead of drifting out of sync with it.
    expect(screen.getByText(siteContent.site.headlineGlowToken)).toBeInTheDocument();
  });

  it("renders all four games by name", () => {
    renderHome();
    ["Krimi", "Colorlition", "Unmatched", "Arcane Poker"].forEach((name) => {
      expect(screen.getByText(name)).toBeInTheDocument();
    });
  });

  it("renders the apparatus name", () => {
    renderHome();
    expect(screen.getByText("react-gameroom")).toBeInTheDocument();
  });

  it("renders every house rule title", () => {
    renderHome();
    // Follow the content rather than restating it, so rewording a rule edits
    // one file instead of two.
    siteContent.houseRules.forEach((rule) => {
      expect(screen.getByText(rule.title)).toBeInTheDocument();
    });
  });
});
