import React from "react";
import ReactDOM from "react-dom";
import SpotifyProvider from "./context/spotifyContext";
import Routes from "./routes";
import CoreLayout from "./common/layouts/CoreLayout";
import "./styles/_main.scss";

ReactDOM.render(
  <React.StrictMode>
    <CoreLayout>
      <SpotifyProvider>
        <Routes />
      </SpotifyProvider>
    </CoreLayout>
  </React.StrictMode>,
  document.getElementById("root")
);
