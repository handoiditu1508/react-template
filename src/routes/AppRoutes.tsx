import MainLayout from "@/layouts/MainLayout";
import { useTranslation } from "react-i18next";
import { Route, Routes } from "react-router-dom";
import MainRoute from "./MainRoute";

export default function AppRoutes() {
  const { t } = useTranslation();

  return (
    <Routes>
      <Route element={<MainLayout />}>
        {MainRoute}
        <Route path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>{t("There's nothing here!")}</p>
            </main>
          }
        />
      </Route>
    </Routes>
  );
}
