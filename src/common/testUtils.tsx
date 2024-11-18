import { BreakpointsProvider } from "@/contexts/BreakpointsContext";
import { ConfirmationDialogProvider } from "@/contexts/ConfirmationDialogContext";
import { InfoProvider } from "@/contexts/InfoContext";
import { NotificationProvider } from "@/contexts/NotificationContext";
import { PaletteModeProvider } from "@/contexts/PaletteModeContext";
import "@/i18n";
import store from "@/redux/store";
import AppThemeProvider from "@/themes/AppThemeProvider";
import { render } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

// eslint-disable-next-line react-refresh/only-export-components
const AllTheProviders = ({ children }: { children: React.ReactNode; }) => {
  return (
    <Provider store={store}>{/* redux store */}
      <NotificationProvider>{/* control notification toasts */}
        <ConfirmationDialogProvider>{/* shared confirmation dialog */}
          <InfoProvider>{/* info about style and environment changes */}
            <PaletteModeProvider>{/* dark, light modes */}
              <AppThemeProvider>{/* mui theme */}
                <BreakpointsProvider>{/* breakpoints helper */}
                  <BrowserRouter>{/* react router */}
                    {children}
                  </BrowserRouter>
                </BreakpointsProvider>
              </AppThemeProvider>
            </PaletteModeProvider>
          </InfoProvider>
        </ConfirmationDialogProvider>
      </NotificationProvider>
    </Provider>
  );
};

export const customRender = (ui: React.ReactNode) => {
  return render(ui, { wrapper: AllTheProviders });
};
