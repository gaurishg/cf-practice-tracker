import { Typography } from "@mui/material";
import { A2OJ_Table } from "./component/A2OJ_Table";
import { MyThemeProvider } from "./component/MyThemeProvider";
import { useAppContext } from "./store/app-context";
import { DIV_2A } from "./store/problem_lists";

function App(): JSX.Element {
  const ctx = useAppContext();
  return (
    <MyThemeProvider>
      {ctx.dataLoaded ? (
        <A2OJ_Table problem_ids={DIV_2A} />
      ) : (
        <Typography>Loading...</Typography>
      )}
    </MyThemeProvider>
  );
}

export default App;
