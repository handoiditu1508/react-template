import { PaletteMode, useMediaQuery } from "@mui/material";
import { ProviderProps, useEffect, useState } from "react";
import PaletteModeContext, { PaletteModeContextType } from "./PaletteModeContext";

type PaletteModeProviderProps = Omit<ProviderProps<PaletteModeContextType>, "value">;

const checkIsSystemPaletteMode = (mode?: string | null) => !mode || (mode !== "light" && mode !== "dark");

export default function PaletteModeProvider(props: PaletteModeProviderProps) {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [paletteMode, setPaletteMode] = useState<PaletteMode | "system">(
    checkIsSystemPaletteMode(localStorage.getItem("paletteMode"))
      ? "system"
      : localStorage.getItem("paletteMode") as PaletteMode
  );
  const currentPaletteMode: PaletteMode = paletteMode === "system" ? (prefersDarkMode ? "dark" : "light") : paletteMode;

  useEffect(() => {
    if (currentPaletteMode === "dark") {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [currentPaletteMode]);

  // load prefered palette mode from local storage
  useEffect(() => {
    const localPaletteMode = localStorage.getItem("paletteMode");
    if (!checkIsSystemPaletteMode(localPaletteMode)) {
      setPaletteMode(localPaletteMode as PaletteMode);
    } else {
      setPaletteMode(prefersDarkMode ? "dark" : "light");
      localStorage.removeItem("paletteMode");
    }
  }, [prefersDarkMode]);

  const setPaletteModeWrapper = (mode: PaletteMode | "system") => {
    setPaletteMode(mode);
    if (mode !== "system") {
      localStorage.setItem("paletteMode", mode);
    } else {
      localStorage.removeItem("paletteMode");
    }
  };

  return <PaletteModeContext.Provider value={{ currentPaletteMode, paletteMode, setPaletteMode: setPaletteModeWrapper }} {...props} />;
}
