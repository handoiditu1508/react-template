import logo from "@/assets/logo.svg";
import CustomLink from "@/components/CustomLink";
import CONFIG from "@/configs";
import BreakpointsContext from "@/contexts/BreakpointsContext";
import InfoContext from "@/contexts/InfoContext";
import PaletteModeContext from "@/contexts/PaletteModeContext";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import MenuIcon from "@mui/icons-material/Menu";
import SettingsIcon from "@mui/icons-material/Settings";
import SettingsBrightnessIcon from "@mui/icons-material/SettingsBrightness";
import { AppBar, Box, Drawer, IconButton, MenuItem, Select, SelectChangeEvent, Slide, ToggleButton, ToggleButtonGroup, Toolbar, Typography, useScrollTrigger, useTheme } from "@mui/material";
import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import LayoutContainer from "../LayoutContainer";
import { SidebarContext } from "../Sidebar";

const languages: { code: string; name: string; }[] = [
  {
    code: "en-US",
    name: "English",
  },
  {
    code: "vi-VN",
    name: "Tiếng Việt",
  },
];

const Header = React.forwardRef<HTMLDivElement>((_, ref) => {
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const { paletteMode, setPaletteMode } = useContext(PaletteModeContext);
  const { sidebarOpen, setSidebarOpen, sidebarState, miniSidebarTransition, permanentSidebarTransition } = useContext(SidebarContext);
  const { smAndDown } = useContext(BreakpointsContext);
  const { mobile } = useContext(InfoContext);
  const hideHeaderTrigger = useScrollTrigger({ threshold: 250 });
  const shadowHeaderTrigger = useScrollTrigger({ threshold: 0, disableHysteresis: true });
  const [settingsDrawerOpen, setSettingsDrawerOpen] = useState<boolean>(false);

  // add transition manually because of <Slide>'s transition conflict
  const slideTransition = hideHeaderTrigger
    ? theme.transitions.create("transform", {
      duration: theme.transitions.duration.leavingScreen,
      easing: theme.transitions.easing.sharp,
    })
    : theme.transitions.create("transform", {
      duration: theme.transitions.duration.enteringScreen,
      easing: theme.transitions.easing.easeOut,
    });

  const handleChangeLanguage = (event: SelectChangeEvent<string>) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <>
      <Slide appear={false} direction="down" in={!hideHeaderTrigger}>
        <Box component="main"
          className="mui-fixed"
          sx={{
            marginLeft: "var(--sidebar-current-width)",
            width: "calc(100% - var(--sidebar-current-width))",
            position: "fixed",
            boxSizing: "border-box",
            ...(sidebarState === "mini" && {
              transition: `${miniSidebarTransition("margin", "width")}, ${slideTransition} !important`,
            }),
            ...((sidebarState === "permanent" || sidebarState === "miniHovered") && {
              transition: `${permanentSidebarTransition("margin", "width")}, ${slideTransition} !important`,
            }),
            zIndex: theme.zIndex.appBar,
          }}>
          <LayoutContainer sx={{
            paddingTop: "var(--header-top-spacing)",
          }}>
            <AppBar position="relative" ref={ref} elevation={4} color="inherit" sx={{
              borderRadius: { md: 2 },
              boxShadow: shadowHeaderTrigger ? undefined : "none",
            }}>
              <Toolbar>
                {(smAndDown || mobile) && <Box flexGrow={1}>
                  <IconButton edge="start" sx={{ marginRight: 1 }} onClick={() => setSidebarOpen(!sidebarOpen)}><MenuIcon /></IconButton>
                </Box>}
                <img src={logo} alt="logo" width={30} height={30} style={{ marginRight: theme.spacing(1) }} />
                <Typography variant="h6">{CONFIG.APP_NAME}</Typography>
                {!(smAndDown || mobile) && <Box sx={{
                  marginLeft: 3,
                  ">.MuiLink-root": {
                    ...theme.typography.button,
                    ":not(:first-of-type)": {
                      marginLeft: 1,
                    },
                    ":not(:last-of-type)": {
                      marginRight: 1,
                    },
                  },
                }}>
                  <CustomLink to="/privacy-policy">{t("Privacy Policy")}</CustomLink>
                </Box>}
                <Box display="flex" justifyContent="flex-end" flexGrow={1}>
                  <IconButton color="primary" edge="end" aria-label="settings" onClick={() => setSettingsDrawerOpen(!settingsDrawerOpen)}><SettingsIcon /></IconButton>
                </Box>
              </Toolbar>
            </AppBar>
          </LayoutContainer>
        </Box>
      </Slide>
      <Drawer open={settingsDrawerOpen} anchor="right" variant="temporary" onClose={() => setSettingsDrawerOpen(false)}>
        <Box sx={{
          ...theme.typography.h6,
          paddingY: 1,
          textAlign: "center",
          borderBottom: theme.shape.smallBorder,
          borderColor: theme.palette.divider,
        }}>
          Settings
        </Box>
        <Box sx={{
          padding: 1,
          ".title": {
            ...theme.typography.subtitle1,
            "&:not(:first-of-type)": {
              marginTop: 2,
            },
          },
        }}>
          <p className="title">Mode</p>
          <ToggleButtonGroup value={paletteMode} color="primary" fullWidth aria-label="toggle button group">
            <ToggleButton value="light" onClick={() => setPaletteMode("light")}><LightModeIcon /></ToggleButton>
            <ToggleButton value="system" onClick={() => setPaletteMode("system")}><SettingsBrightnessIcon /></ToggleButton>
            <ToggleButton value="dark" onClick={() => setPaletteMode("dark")}><DarkModeIcon /></ToggleButton>
          </ToggleButtonGroup>

          <p className="title">Language</p>
          <Select value={i18n.resolvedLanguage || languages[0].code} fullWidth size="small" onChange={handleChangeLanguage}>
            {languages.map(language => <MenuItem key={language.code} value={language.code}>{language.name}</MenuItem>)}
          </Select>
        </Box>
      </Drawer>
    </>
  );
});

export default Header;
