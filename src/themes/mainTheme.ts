import { ThemeOptions, createTheme } from "@mui/material";
// When using TypeScript 4.x and above
import type { } from "@mui/lab/themeAugmentation";
// When using TypeScript 3.x and below
import "@mui/lab/themeAugmentation";

const themeOptions: ThemeOptions = {
  typography: {
    fontFamily: "Roboto, Helvetica, Arial, sans-serif",
  },
};

const mainTheme = createTheme(themeOptions);

export default mainTheme;
