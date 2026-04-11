import Suspense from "@/components/Suspense";
import React from "react";
import { createHashRouter } from "react-router-dom";
import mainRoutes from "./mainRoutes";

const MainLayout = React.lazy(() => import("@/layouts/MainLayout"));

const router = createHashRouter([
  {
    element: <Suspense><MainLayout /></Suspense>,
    children: [
      ...mainRoutes,
      {
        path: "*",
        element: (
          <main style={{ padding: "1rem" }}>
            <p>There's nothing here!</p>
          </main>
        ),
      },
    ],
  },
]);

export default router;
