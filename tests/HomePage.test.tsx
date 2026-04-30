import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import { MemoryRouter } from "react-router-dom";
import theme from "../src/theme/theme";
import HomePage from "../src/pages/HomePage";

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
    expect(screen.getByText("Experience")).toBeInTheDocument();
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

  it("renders the four house rules titles", () => {
    renderHome();
    expect(screen.getByText(/Free to play/i)).toBeInTheDocument();
    expect(screen.getByText(/Open source/i)).toBeInTheDocument();
    expect(screen.getByText(/No analytics/i)).toBeInTheDocument();
    expect(screen.getByText(/database wipes daily/i)).toBeInTheDocument();
  });
});
