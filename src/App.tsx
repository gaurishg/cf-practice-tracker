import { Stack } from "@mui/material";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { MyThemeProvider } from "./component/MyThemeProvider";
import { TopBar } from "./component/TopBar";
import { A2OJLadders } from "./pages/A2OJLadders";
import { A2OJTablePage } from "./pages/A2OJTablePage";

function App(): JSX.Element {
  console.log("App rendered again");
  return (
    <MyThemeProvider>
      <center>
        <Stack maxWidth={800}>
          <TopBar />
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
