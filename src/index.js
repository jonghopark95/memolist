import React from "react";
import ReactDOM from "react-dom";
import AppRouter from "./router";
import GlobalStyle from "./common/styles/globalStyle";
import { Provider } from "react-redux";
import store from "./common/redux/store";

ReactDOM.render(
  <Provider store={store}>
    <GlobalStyle />
    <AppRouter />
  </Provider>,
  document.getElementById("root")
);
