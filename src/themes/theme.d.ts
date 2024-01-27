import ColorOption from "@/models/ColorOption";
import "@mui/material/styles";
import { CSSProperties } from "@mui/material/styles/createMixins";
import "@mui/system/createTheme";

export interface ThemeConstants {
  scalingFactor: number;
  scrollbarSize: number;
}

declare module "@mui/material/styles" {
  export interface Theme {
    constants: ThemeConstants;
  }

  export interface ThemeOptions {
    constants?: ThemeConstants;
  }

  export interface Palette {
    isPaletteColorOption: (color?: string) => color is ColorOption;
  }

  export interface PaletteOptions {
    isPaletteColorOption?: (color?: string) => color is ColorOption;
  }

  export interface SimplePaletteColorOptions {
  }

  export interface PaletteColor {
  }

  export interface Mixins {
    scrollbar: CSSProperties;
    hideNumberInputArrows: CSSProperties;
  }

  export interface CommonColors {
  }

  export interface Duration {
    long: number;
  }
}

declare module "@mui/system/createTheme/shape" {
  export interface Shape {
    smallBorder: string;
    mediumBorder: string;
    largeBorder: string;
  }
}

// Update the Button's color prop options
declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
  }
}
