import { Box, styled } from "@mui/material";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

const LayoutContainer = styled(Box)(({ theme }) => ({
  minWidth: "100vw",
  minHeight: "100vh",
  background: theme.palette.primary.dark,
}));
export default function MainLayout() {
  return (
    <LayoutContainer>
      <Navbar />
      <Box sx={{margin: "0 1.5rem"}}>
        <Outlet />
      </Box>
    </LayoutContainer>
  );
}
