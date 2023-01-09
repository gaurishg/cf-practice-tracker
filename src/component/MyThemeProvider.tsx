import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { FC, PropsWithChildren } from "react";
import { useAppContext } from "../store/app-context";

export const MyThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  const ctx = useAppContext();
  const theme = createTheme({
    palette: {
      mode: ctx.theme,
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
