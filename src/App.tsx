import { AppBar, Box, Grid, TextField, Toolbar } from "@mui/material";
import { Stack } from "@mui/system";
import { useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { checkUserHandle, getProblemsSolvedByUser } from "./common/utils";
import { MyThemeProvider } from "./component/MyThemeProvider";
import { A2OJLadders } from "./pages/A2OJLadders";
import { A2OJTablePage } from "./pages/A2OJTablePage";
import { useAppContext } from "./store/app-context";

function App(): JSX.Element {
  const ctx = useAppContext();
  const [cfHandle, setCFHandle] = useState(ctx.handle);
  console.log("App rendered again!");

  const onHandleChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setCFHandle(event.target.value.trim());
  };
  const onHandleSet: React.FocusEventHandler<HTMLInputElement> = (event) => {
    if (!cfHandle) return;
    Promise.all([
      checkUserHandle(cfHandle),
      getProblemsSolvedByUser(cfHandle),
    ]).then(([doesUserExist, problem_ids]) => {
      if (doesUserExist) localStorage.setItem("CF_HANDLE", cfHandle);
      ctx.updateContext(function (oldCtx) {
        return {
          ...oldCtx,
          handle: cfHandle,
          usersProblems: { solved: problem_ids },
          isUserValid: doesUserExist,
        };
      });
    });
  };
  return (
    <MyThemeProvider>
      <center>
        <Stack maxWidth={800}>
          <AppBar position="static">
            <Toolbar>
              <Box flexGrow={1}></Box>
              <TextField
                placeholder="codeforces handle"
                value={cfHandle}
                onChange={onHandleChange}
                onBlur={onHandleSet}
                error={cfHandle.length > 0 && !ctx.isUserValid}
              />
            </Toolbar>
          </AppBar>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Navigate to="/a2oj" replace />} />
              <Route path="/a2oj" element={<A2OJLadders />}>
                <Route path=":problemset_id" element={<A2OJTablePage />} />
              </Route>
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
        </Stack>
      </center>
    </MyThemeProvider>
  );
}

export default App;
