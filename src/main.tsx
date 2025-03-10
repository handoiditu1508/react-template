import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { BreakpointsProvider } from "./contexts/breakpoints";
import { InfoProvider } from "./contexts/InfoContext";
import { PaletteModeProvider } from "./contexts/PaletteModeContext";
import { ConfirmationDialogProvider } from "./features/confirmationDialog";
import "./i18n";
import "./index.scss";
import store from "./redux/store";
import AppThemeProvider from "./themes/AppThemeProvider";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>{/* redux store */}
      <ConfirmationDialogProvider>{/* shared confirmation dialog */}
        <InfoProvider>{/* info about style and environment changes */}
          <PaletteModeProvider>{/* dark, light modes */}
            <AppThemeProvider>{/* mui theme */}
              <BreakpointsProvider>{/* breakpoints helper */}
                <BrowserRouter>{/* react router */}
                  <App />
                </BrowserRouter>
              </BreakpointsProvider>
            </AppThemeProvider>
          </PaletteModeProvider>
        </InfoProvider>
      </ConfirmationDialogProvider>
    </Provider>
  </React.StrictMode>
);
