import { createTheme } from "@material-ui/core";

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
    text: {
      primary: "#333"
    }
  }
});

export default theme;

