import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { MyThemeProvider } from "./component/MyThemeProvider";
import "./index.scss";
import { AppContextProvider } from "./store/app-context";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AppContextProvider>
      <MyThemeProvider>
        <App />
      </MyThemeProvider>
    </AppContextProvider>
  </React.StrictMode>
);
