import React from "react";
import { RouteObject } from "react-router-dom";

const MainModule = React.lazy(() => import("@/modules/Main"));
const HomePage = React.lazy(() => import("@/modules/Main/pages/HomePage"));

const mainRoutes: RouteObject[] = [
  {
    element: <MainModule />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],
  },
];

export default mainRoutes;
