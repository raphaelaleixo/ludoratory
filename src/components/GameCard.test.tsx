import { render, screen } from "@testing-library/react";
import { GameCard } from "./GameCard";

describe("GameCard ctaLabel", () => {
  it("renders the default overlay label when ctaLabel is omitted", () => {
    render(
      <GameCard name="Some Game" image="/x.png" url="https://example.com">
        A game.
      </GameCard>,
    );
    expect(screen.getByText("Play now ↗")).toBeInTheDocument();
  });

  it("renders a custom overlay label when ctaLabel is provided", () => {
    render(
      <GameCard
        name="Ligas do Brasil"
        image="/x.png"
        url="https://example.com"
        ctaLabel="Read the manifesto ↗"
      >
        A manifesto.
      </GameCard>,
    );
    expect(screen.getByText("Read the manifesto ↗")).toBeInTheDocument();
    expect(screen.queryByText("Play now ↗")).not.toBeInTheDocument();
  });
});
