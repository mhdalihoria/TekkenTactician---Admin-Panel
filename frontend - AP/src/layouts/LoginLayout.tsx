import { Box, styled } from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";

const LoginLayoutContainer = styled(Box)(({ theme }) => ({
  background: theme.palette.primary.dark,
  minHeight: "100vh",
  minWidth: "100vw",

  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
}));

const AuthPageTitle = styled("h1")(({ theme }) => ({
  fontFamily: "Tarrget",
  margin: "5.625rem 0",
  fontSize: "48px",
  color: theme.palette.accent.light,
}));

export default function LoginLayout() {
  const location = useLocation();
  const pageTitle = location.pathname.split("/")[1];

  return (
    <LoginLayoutContainer>
      <AuthPageTitle>{pageTitle}</AuthPageTitle>
      <Outlet />
    </LoginLayoutContainer>
  );
}
