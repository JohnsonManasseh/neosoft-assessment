import { ThemeProvider, createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#0eaf94",
    },
    secondary: {
      main: "#185a9d",
    },
  },

  typography: {
    fontSize: 12,
  },
});
