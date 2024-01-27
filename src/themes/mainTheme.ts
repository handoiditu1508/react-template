import { ThemeOptions, createTheme } from "@mui/material";

const themeOptions: ThemeOptions = {
  typography: {
    fontFamily: "Roboto, Helvetica, Arial, sans-serif",
  },
};

const mainTheme = createTheme(themeOptions);

export default mainTheme;
