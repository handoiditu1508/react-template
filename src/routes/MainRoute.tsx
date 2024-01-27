import React from "react";
import { Route } from "react-router-dom";
const HomePage = React.lazy(() => import("@/modules/Main/pages/HomePage"));

const MainRoute = (
  <>
    <Route index element={<HomePage />} />
  </>
);

export default MainRoute;
