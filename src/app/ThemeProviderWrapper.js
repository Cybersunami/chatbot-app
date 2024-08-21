"use client"; // Mark this as a client component

import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { deepPurple, indigo } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: deepPurple,
    secondary: indigo,
  },
  typography: {
    fontFamily: "'Inter', sans-serif", // Directly set the font family
  },
});

export default function ThemeProviderWrapper({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
