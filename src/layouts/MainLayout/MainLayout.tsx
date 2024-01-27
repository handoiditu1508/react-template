import Suspense from "@/components/Suspense";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <Box>
      <Suspense>
        <Outlet />
      </Suspense>
    </Box>
  );
}

export default MainLayout;
