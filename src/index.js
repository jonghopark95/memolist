import React from "react";
import ReactDOM from "react-dom";
// import store from "./common/store";
// import { Provider } from "react-redux";
import AppRouter from "./router";
import GlobalStyle from "./common/styles/globalStyle";

ReactDOM.render(
  <>
    <GlobalStyle />
    <AppRouter />
  </>,
  document.getElementById("root")
);
