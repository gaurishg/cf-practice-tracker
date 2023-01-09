import {
  createTheme,
  CssBaseline,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { A2OJ_Table } from "./component/A2OJ_Table";
import { useAppContext } from "./store/app-context";
import { DIV_2A } from "./store/problem_lists";

function App(): JSX.Element {
  const ctx = useAppContext();
  const theme = createTheme({
    palette: {
      mode: ctx.theme,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {ctx.dataLoaded ? (
        <A2OJ_Table title="Sample" problem_ids={DIV_2A} />
      ) : (
        <Typography>Loading...</Typography>
      )}
    </ThemeProvider>
  );
}

export default App;
