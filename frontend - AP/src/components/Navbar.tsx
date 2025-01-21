import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Logo from "../assets/images/Logo.svg";
import { styled, Drawer } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import FolderIcon from "@mui/icons-material/Folder";
import PeopleIcon from "@mui/icons-material/People";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import FlexBox from "../custom-components/flex-box/FlexBox";
import rootShouldForwardProp from "@mui/material/styles/rootShouldForwardProp";

const AppBarStyled = styled(AppBar)(({ theme }) => ({
  background: theme.palette.primary.dark,
  boxShadow: "none",
  marginBottom: "2rem",
}));

const ImageStyled = styled("img")(() => ({
  display: "block",
  padding: "0 12px",
}));

const MenuItemsStyled = styled(FlexBox, {
  shouldForwardProp: (prop) => prop !== "text",
})<{ text: string }>(({ theme, text }) => {
  const isLogoutStyles =
    text === "Logout"
      ? {
          color: "#d02823 !important",
          position: "fixed",
          bottom: "1rem",
          ".icon": {
            color: "#d02823",
          },
        }
      : undefined;
  return {
    color: theme.palette.navy[400],
    padding: "1em",
    fontWeight: 700,
    fontSize: "1.25rem",
    cursor: "pointer",

    ".icon": {
      color: theme.palette.accent.light,
    },
    ...isLogoutStyles,
  };
});

const menuItems = [
  { text: "All Guides", icon: <HomeIcon /> },
  { text: "My Guides", icon: <FolderIcon /> },
  { text: "Char Guides", icon: <PeopleIcon /> },
  { text: "Char Anti Guide", icon: <PersonOffIcon /> },
  { text: "Logout", icon: <LogoutIcon /> },
];

export default function Navbar() {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setIsDrawerOpen(open);
    };

  const drawerContent = (
    <Box
      sx={(theme) => ({
        width: 250,
        height: "100vh",
        background: theme.palette.primary.main,
      })}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <Box>
        {menuItems.map((item, index) => (
          <MenuItemsStyled
            key={index}
            alignItems={"revert"}
            gap={"10px"}
            text={item.text}
          >
            <div className="icon">{item.icon}</div>
            <p>{item.text}</p>
          </MenuItemsStyled>
        ))}
      </Box>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBarStyled position="static">
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <ImageStyled src={Logo} alt="Logo" />
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ ml: 0 }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon sx={(theme) => ({ color: theme.palette.accent.light })} />
          </IconButton>
        </Toolbar>
      </AppBarStyled>

      <Drawer anchor="right" open={isDrawerOpen} onClose={toggleDrawer(false)}>
        {drawerContent}
      </Drawer>
    </Box>
  );
}
