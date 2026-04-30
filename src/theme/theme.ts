import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    accent: {
      acid: string;
      magenta: string;
      amber: string;
      violet: string;
    };
    surface: {
      base: string;
      tile: string;
      apparatus: string;
      rules: string;
    };
    tape: {
      yellow: string;
      cream: string;
      blue: string;
      orange: string;
    };
  }
  interface PaletteOptions {
    accent?: Partial<Palette["accent"]>;
    surface?: Partial<Palette["surface"]>;
    tape?: Partial<Palette["tape"]>;
  }
}

const theme = createTheme({
  palette: {
    mode: "dark",
    background: { default: "#0a1414", paper: "#020606" },
    text: { primary: "#efe9d8", secondary: "#c4c0b0", disabled: "#8aa1a1" },
    accent: {
      acid: "#7fffd4",
      magenta: "#ff9bbd",
      amber: "#ffd166",
      violet: "#c8a3ff",
    },
    surface: {
      base: "#0a1414",
      tile: "#020606",
      apparatus: "#010505",
      rules: "#030607",
    },
    tape: {
      yellow: "rgba(245, 222, 130, 0.94)",
      cream: "rgba(255, 230, 160, 0.94)",
      blue: "rgba(180, 200, 245, 0.94)",
      orange: "rgba(255, 140, 100, 0.94)",
    },
  },
  typography: {
    fontFamily: '"DM Sans", system-ui, sans-serif',
    h1: { fontFamily: '"Space Grotesk", "DM Sans", sans-serif', fontWeight: 700, letterSpacing: "-0.025em", lineHeight: 0.92 },
    h2: { fontFamily: '"Space Grotesk", "DM Sans", sans-serif', fontWeight: 700, letterSpacing: "-0.02em" },
    h3: { fontFamily: '"Space Grotesk", "DM Sans", sans-serif', fontWeight: 700, letterSpacing: "-0.02em" },
    body1: { fontSize: "16px", lineHeight: 1.55 },
    button: { textTransform: "none", fontWeight: 600 },
  },
  components: {
    MuiLink: {
      styleOverrides: {
        root: ({ theme }) => ({
          "&:focus-visible": {
            outline: `2px solid ${theme.palette.accent.acid}`,
            outlineOffset: "3px",
            borderRadius: "2px",
          },
        }),
      },
    },
  },
});

export default theme;
