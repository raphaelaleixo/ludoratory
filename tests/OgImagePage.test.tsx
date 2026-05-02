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

  it("renders the note title alone when ?title is present", () => {
    renderAt("/og-image?title=Why%20we%20stopped%20mocking");
    expect(screen.getByText("Why we stopped mocking")).toBeInTheDocument();
    // site headline must NOT be rendered in note mode
    expect(screen.queryByText(/From Experiments/i)).not.toBeInTheDocument();
  });
});
