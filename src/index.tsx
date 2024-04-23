import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { BreakpointsProvider } from "./contexts/BreakpointsContext";
import { ConfirmationDialogProvider } from "./contexts/ConfirmationDialogContext";
import { InfoProvider } from "./contexts/InfoContext";
import { NotificationProvider } from "./contexts/NotificationContext";
import { PaletteModeProvider } from "./contexts/PaletteModeContext";
import "./i18n";
import "./index.scss";
import store from "./redux/store";
import reportWebVitals from "./reportWebVitals";
import AppThemeProvider from "./themes/AppThemeProvider";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>{/* redux store */}
      <NotificationProvider>{/* control notification toasts */}
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
      </NotificationProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
