import { createTheme } from "@material-ui/core";

import red from "@material-ui/core/colors/red";
const likeColor = red[500];

const theme = createTheme({
  palette: {
    primary: {
      dark: "#F0E3C0",
      main: "#FFF2CC",
      contrastText: "#333",
      light: "#FFF1CC"
    },
    secondary: {
      main: "#627053",
      dark: "#576546",
      contrastText: "#fdfdfd"
    },
    accent: {
      main: likeColor
    },
    text: {
      primary: "#333"
    }
  }
});

export default theme;

