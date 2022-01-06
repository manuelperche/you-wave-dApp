import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { red } from "@mui/material/colors";

let theme = createTheme({
  components: {
    MuiTextField: {
      defaultProps: {
        color: "secondary",
      },
      styleOverrides: {
        root: {
          backgroundColor: "#FFF",
          border: "1px solid #ced4da",
          borderRadius: "0.25rem",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "#231f20",
        },
      },
    },
  },
  typography: {
    h1: {
      color: "#F9F7F5",
      fontSize: "5rem",
    },
    subtitle1: {
      color: "#F9F7F5",
    },
    subtitle2: {
      color: "#F9F7F5",
    }
  },
  palette: {
    primary: {
      main: "#F9F7F5",
    },
    secondary: {
      main: "#323339",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#323339",
    },
    text: {
      primary: "#323339",
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;
