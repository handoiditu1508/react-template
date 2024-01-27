import "./App.scss";
import { ConfirmationDialog } from "./providers/ConfirmationDialogProvider";
import { NotificationSnackbar } from "./providers/NotificationProvider";
import AppRoutes from "./routes";

function App() {

  return (
    <>
      <AppRoutes />
      <NotificationSnackbar />
      <ConfirmationDialog />
    </>
  );
}

export default App;
