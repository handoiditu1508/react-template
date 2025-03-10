import { PaletteMode } from "@mui/material";
import React from "react";

export type PaletteModeContextType = {
  currentPaletteMode: PaletteMode;
  paletteMode: PaletteMode | "system";
  setPaletteMode: (mode: PaletteMode | "system") => void;
};

const PaletteModeContext = React.createContext<PaletteModeContextType>({} as PaletteModeContextType);

export default PaletteModeContext;
