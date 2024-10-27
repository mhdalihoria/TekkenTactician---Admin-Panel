import { Box, styled } from "@mui/material";
import Navbar from "../components/Navbar";

const LayoutContainer = styled(Box)(({ theme }) => ({
  minWidth: "100vw",
  minHeight: "100vh",
  background: theme.palette.primary.dark,
}));
export default function MainLayout() {
  return (
    <LayoutContainer>
      <Navbar />
      <div>MainLayout</div>
    </LayoutContainer>
  );
}
