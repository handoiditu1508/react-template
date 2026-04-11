import HomeIcon from "@mui/icons-material/Home";
import React from "react";
import { RouteObject } from "react-router-dom";
import { RouteHandleObject } from "./models";

const MainModule = React.lazy(() => import("@/modules/Main"));
const HomePage = React.lazy(() => import("@/modules/Main/pages/HomePage"));

const mainRoutes: RouteObject[] = [
  {
    element: <MainModule />,
    children: [
      {
        index: true,
        element: <HomePage />,
        handle: {
          crumb: () => ({
            to: "/",
            icon: <HomeIcon />,
          }),
          hideBreadcrumbs: true,
        } as RouteHandleObject,
      },
      // example of breadcrumb configuration for user detail page
      // {
      //   path: "users/:userId",
      //   element: <UserDetailPage />,
      //   loader: async (args) => ({
      //     userId: args.params.userId,
      //   }),
      //   handle: {
      //     crumb: (data) => ({
      //       to: `users/${data.userId}`,
      //       icon: <HomeIcon />,
      //     }),
      //   } as RouteHandleObject,
      // },
    ],
  },
];

export default mainRoutes;
