import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import { MemoryRouter } from "react-router-dom";
import theme from "../src/theme/theme";
import OgImagePage from "../src/pages/OgImagePage";

function renderAt(url: string) {
  return render(
    <ThemeProvider theme={theme}>
      <MemoryRouter initialEntries={[url]}>
        <OgImagePage />
      </MemoryRouter>
    </ThemeProvider>,
  );
}

describe("OgImagePage", () => {
  it("renders the site headline when no params are present", () => {
    renderAt("/og-image");
    expect(screen.getByText(/From Experiments/i)).toBeInTheDocument();
    expect(screen.getByText(/Experiences/)).toBeInTheDocument();
    expect(screen.getByText("LUDORATORY")).toBeInTheDocument();
  });

  it("renders the note title and Lab Note label when ?title is present", () => {
    renderAt("/og-image?title=Why%20we%20stopped%20mocking&date=2026-04-15");
    expect(screen.getByText("Why we stopped mocking")).toBeInTheDocument();
    expect(screen.getByText(/Lab Note · 2026-04-15/i)).toBeInTheDocument();
    // site headline must NOT be rendered in note mode
    expect(screen.queryByText(/From Experiments/i)).not.toBeInTheDocument();
  });

  it("falls back to plain Lab Note label when only title is provided", () => {
    renderAt("/og-image?title=Standalone%20note");
    expect(screen.getByText("Standalone note")).toBeInTheDocument();
    expect(screen.getByText(/^Lab Note$/i)).toBeInTheDocument();
  });
});
