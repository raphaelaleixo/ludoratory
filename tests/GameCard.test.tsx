import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../src/theme/theme";
import { GameCard } from "../src/components/GameCard";
import type { Game } from "../src/types";

const baseGame: Game = {
  id: "krimi",
  specimen: "01",
  name: "Krimi",
  inspiration: "Deception: Murder in Hong Kong (Ho, 2014)",
  description: "Decode the forensic scientist's clues.",
  players: "5–12",
  status: "live",
  url: "https://krimi.ludoratory.com",
  repoUrl: "https://github.com/raphaelaleixo/krimi",
  ogImage: "/og/krimi.png",
  tapeVariant: "yellow",
  note: null,
};

function renderCard(game: Game) {
  return render(
    <ThemeProvider theme={theme}>
      <GameCard game={game} />
    </ThemeProvider>,
  );
}

describe("GameCard", () => {
  it("renders the game name, players, description, and play/code links", () => {
    renderCard(baseGame);
    expect(screen.getByText("Krimi")).toBeInTheDocument();
    expect(screen.getByText(/5–12/)).toBeInTheDocument();
    expect(screen.getByText(/forensic scientist/)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /play/i })).toHaveAttribute("href", "https://krimi.ludoratory.com");
    expect(screen.getByRole("link", { name: /code/i })).toHaveAttribute("href", "https://github.com/raphaelaleixo/krimi");
  });

  it("renders the inspiration line when non-null", () => {
    renderCard(baseGame);
    expect(screen.getByText(/Deception: Murder in Hong Kong/)).toBeInTheDocument();
  });

  it("omits the inspiration line when null", () => {
    renderCard({ ...baseGame, inspiration: null });
    expect(screen.queryByText(/↳/)).not.toBeInTheDocument();
  });

  it("renders the note as a scribble when non-null", () => {
    renderCard({ ...baseGame, note: "tested w/ 6 ppl ✓" });
    expect(screen.getByText("tested w/ 6 ppl ✓")).toBeInTheDocument();
  });

  it("does not render a scribble when note is null", () => {
    const { container } = renderCard(baseGame);
    expect(container.textContent).not.toContain("tested w/");
  });
});
