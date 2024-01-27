import "./App.scss";
import { NotificationSnackbar } from "./providers/NotificationProvider";
import AppRoutes from "./routes";

function App() {

  return (
    <>
      <AppRoutes />
      <NotificationSnackbar />
    </>
  );
}

export default App;
