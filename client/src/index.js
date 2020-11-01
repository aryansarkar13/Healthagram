import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import Root from "./Root";
import "react-notifications/lib/notifications.css";

//Sass uses the relative imports
//React Js uses the absolute imports
ReactDOM.render(
  <Root>
    <Router>
      <App />
    </Router>
  </Root>,
  document.getElementById("root")
);
