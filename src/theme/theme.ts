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
    background: { default: "#0c100e", paper: "#11171a" },
    text: { primary: "#efe9d8", secondary: "#c4c0b0", disabled: "#8aa091" },
    accent: {
      acid: "#a3ff5c",
      magenta: "#ff9bbd",
      amber: "#ffd166",
      violet: "#c8a3ff",
    },
    surface: {
      base: "#0c100e",
      tile: "#11171a",
      apparatus: "#0a1614",
      rules: "#0e1a18",
    },
    tape: {
      yellow: "rgba(245, 222, 130, 0.94)",
      cream: "rgba(255, 230, 160, 0.94)",
      blue: "rgba(180, 200, 245, 0.94)",
      orange: "rgba(255, 140, 100, 0.94)",
    },
  },
  typography: {
    fontFamily: '"Inter", system-ui, sans-serif',
    h1: { fontFamily: '"Space Grotesk", "Inter", sans-serif', fontWeight: 700, letterSpacing: "-0.025em", lineHeight: 0.92 },
    h2: { fontFamily: '"Space Grotesk", "Inter", sans-serif', fontWeight: 700, letterSpacing: "-0.02em" },
    h3: { fontFamily: '"Space Grotesk", "Inter", sans-serif', fontWeight: 700, letterSpacing: "-0.02em" },
    body1: { fontSize: "14px", lineHeight: 1.55 },
    button: { textTransform: "none", fontWeight: 600 },
  },
});

export default theme;
