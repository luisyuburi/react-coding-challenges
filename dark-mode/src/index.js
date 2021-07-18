import React from "react";
import ReactDOM from "react-dom";
import AppContainer from "./common/containers/App";

import DarkModeProvider from "./context/DarkModeContext";

import "./styles/_main.scss";
import Routes from "./routes";

ReactDOM.render(
  <AppContainer>
    <DarkModeProvider>
      <Routes />
    </DarkModeProvider>
  </AppContainer>,
  document.getElementById("root")
);
