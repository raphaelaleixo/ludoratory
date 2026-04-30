import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../src/theme/theme";
import { HouseRules } from "../src/components/HouseRules";
import type { HouseRule } from "../src/types";

const rules: HouseRule[] = [
  { number: "01", title: "Free.",      description: "no paywalls" },
  { number: "02", title: "Open.",      description: "github" },
  { number: "03", title: "Private.",   description: "no analytics" },
  { number: "04", title: "Ephemeral.", description: "wipes daily" },
];

describe("HouseRules", () => {
  it("renders all four rule numbers, titles, and descriptions", () => {
    render(
      <ThemeProvider theme={theme}>
        <HouseRules rules={rules} />
      </ThemeProvider>,
    );
    rules.forEach((r) => {
      expect(screen.getByText(r.number)).toBeInTheDocument();
      expect(screen.getByText(r.title)).toBeInTheDocument();
      expect(screen.getByText(r.description)).toBeInTheDocument();
    });
  });
});
