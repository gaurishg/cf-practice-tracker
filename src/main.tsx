import { CssBaseline } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.scss";
import { AppContextProvider } from "./store/app-context";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <CssBaseline />
    <AppContextProvider>
      <App />
    </AppContextProvider>
  </React.StrictMode>
);
