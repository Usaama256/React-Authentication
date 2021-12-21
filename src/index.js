import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, HashRouter } from "react-router-dom";
import { AuthContextProvider } from "./store/AuthContext";
import "./index.css";
import App from "./App";

ReactDOM.render(
  <HashRouter>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </HashRouter>,
  document.getElementById("root")
);
