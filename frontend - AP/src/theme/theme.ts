import { createTheme } from "@mui/material/styles";
import { themeColors } from "./themeColors";

const theme = createTheme({
  palette: {
    primary: {
      main: "#0e223f",
      light: "#193e73",
      dark: "#09172c",
    },
    secondary: {
      main: "#3559c2",
      light: "#3559C2",
      dark: "#253e87",
    },
    accent: {
      main: "#088395",
      light: "#399BAA",
      dark: "#055B68",
    },
    ...themeColors
  },
});

export default theme;
