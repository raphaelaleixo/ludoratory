import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../src/theme/theme";
import { GameCard } from "../src/components/GameCard";

function renderCard(ui: React.ReactElement) {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
}

describe("GameCard", () => {
  it("renders name, players, description (children), and play/code links when all props are present", () => {
    renderCard(
      <GameCard
        name="Krimi"
        image="/og/krimi.png"
        url="https://krimi.ludoratory.com"
        repoUrl="https://github.com/raphaelaleixo/krimi"
        players="5–12 players"
        inspiration="Deception: Murder in Hong Kong (Ho, 2014)"
      >
        Decode the forensic scientist's clues.
      </GameCard>,
    );
    expect(screen.getByText("Krimi")).toBeInTheDocument();
    expect(screen.getByText(/5–12/)).toBeInTheDocument();
    expect(screen.getByText(/forensic scientist/)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /play/i })).toHaveAttribute(
      "href",
      "https://krimi.ludoratory.com",
    );
    expect(screen.getByRole("link", { name: /code/i })).toHaveAttribute(
      "href",
      "https://github.com/raphaelaleixo/krimi",
    );
  });

  it("renders the inspiration line when provided", () => {
    renderCard(
      <GameCard
        name="X"
        image="/i.png"
        url="https://x"
        repoUrl="https://r"
        players="2"
        inspiration="Some Source (2020)"
      >
        body
      </GameCard>,
    );
    expect(screen.getByText(/Some Source/)).toBeInTheDocument();
  });

  it("omits the inspiration line when not provided", () => {
    renderCard(
      <GameCard name="X" image="/i.png" url="https://x" repoUrl="https://r" players="2">
        body
      </GameCard>,
    );
    expect(screen.queryByText(/↳/)).not.toBeInTheDocument();
  });

  it("renders the note as a scribble when provided", () => {
    renderCard(
      <GameCard
        name="X"
        image="/i.png"
        url="https://x"
        repoUrl="https://r"
        players="2"
        note="hidden roles"
      >
        body
      </GameCard>,
    );
    expect(screen.getByText("hidden roles")).toBeInTheDocument();
  });

  it("does not render the play link or overlay when url is omitted", () => {
    renderCard(
      <GameCard name="X" image="/i.png" repoUrl="https://r" players="2">
        body
      </GameCard>,
    );
    expect(screen.queryByRole("link", { name: /play/i })).not.toBeInTheDocument();
  });

  it("omits the footer entirely when both repoUrl and players are absent", () => {
    renderCard(
      <GameCard name="X" image="/i.png" url="https://x">
        body
      </GameCard>,
    );
    expect(screen.queryByRole("link", { name: /code/i })).not.toBeInTheDocument();
    expect(screen.queryByText(/players/i)).not.toBeInTheDocument();
  });

  it("renders only players in the footer when repoUrl is absent", () => {
    renderCard(
      <GameCard name="X" image="/i.png" url="https://x" players="3–5 players">
        body
      </GameCard>,
    );
    expect(screen.getByText(/3–5 players/)).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /code/i })).not.toBeInTheDocument();
  });

  it("renders only the code link in the footer when players is absent", () => {
    renderCard(
      <GameCard name="X" image="/i.png" url="https://x" repoUrl="https://r">
        body
      </GameCard>,
    );
    expect(screen.getByRole("link", { name: /code/i })).toHaveAttribute("href", "https://r");
  });
});
