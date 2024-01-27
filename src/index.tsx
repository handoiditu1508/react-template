import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import "./index.scss";
import AppThemeProvider from "./providers/AppThemeProvider";
import BreakpointsProvider from "./providers/BreakpointsProvider";
import InfoProvider from "./providers/InfoProvider";
import PaletteModeProvider from "./providers/PaletteModeProvider";
import store from "./redux/store";
import reportWebVitals from "./reportWebVitals";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>{/* redux store */}
      <InfoProvider>{/* info about style and environment changes */}
        <PaletteModeProvider>{/* dark, light modes */}
          <AppThemeProvider>{/* mui theme */}
            <BreakpointsProvider>{/* breakpoints helper */}
              <App />
            </BreakpointsProvider>
          </AppThemeProvider>
        </PaletteModeProvider>
      </InfoProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
